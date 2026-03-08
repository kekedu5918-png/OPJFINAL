/**
 * OPJ EXAMEN — Mode Examen Complet
 * Simulation des conditions réelles : timer, pas de retour arrière, résultats détaillés.
 * EP1 : 30 questions · 90 min | EP2 : 30 questions · 120 min | Complet : 60 questions · 3h
 */

const EXAM_CONFIGS = [
  {
    id: 'ep1',
    label: 'Épreuve 1 — DPG + DPS',
    coeff: 2,
    duration: 90 * 60,
    questionCount: 30,
    epreuve: 'ep1',
    color: 'var(--c-ep1)',
    badge: 'EP1',
    filters: ['ep1_dpg', 'ep1_dps'],
    tip: 'Pas de retour en arrière possible. Réponds à chaque question dans l\'ordre.',
    elimLimit: 5
  },
  {
    id: 'ep2',
    label: 'Épreuve 2 — Procédure Pénale',
    coeff: 3,
    duration: 120 * 60,
    questionCount: 30,
    epreuve: 'ep2',
    color: 'var(--c-ep2)',
    badge: 'EP2',
    filters: ['ep2_pp'],
    tip: 'Coefficient 3 — c\'est l\'épreuve la plus importante. Prends le temps de lire les questions.',
    elimLimit: 5
  },
  {
    id: 'complet',
    label: 'Examen complet (EP1 + EP2)',
    coeff: null,
    duration: 3 * 60 * 60,
    questionCount: 60,
    epreuve: 'all',
    color: 'var(--c-gold)',
    badge: 'COMPLET',
    filters: ['ep1_dpg', 'ep1_dps', 'ep2_pp'],
    tip: 'Simulation complète de l\'examen. 3 heures. Ne quitte pas cet écran.',
    elimLimit: 5
  }
];

let examState = {
  config: null,
  questions: [],
  index: 0,
  answers: [],
  startedAt: null,
  timerInterval: null,
  secondsLeft: 0,
  phase: 'select' // 'select' | 'briefing' | 'question' | 'results'
};

let _container = null;

/* ─────────────────────────────────────────────
   UTILITAIRES
───────────────────────────────────────────── */

function getAllQcm() {
  return [...(window.QUESTIONS_EP1 || []), ...(window.QUESTIONS_EP2 || [])];
}

function filterByConfig(config) {
  const all = getAllQcm();
  let pool = all.filter(q => {
    if (config.epreuve === 'all') return true;
    if (config.epreuve === 'ep1') return q.epreuve === 1;
    if (config.epreuve === 'ep2') return q.epreuve === 2;
    return false;
  });
  // Shuffle Fisher-Yates
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, config.questionCount);
}

function formatTime(seconds) {
  if (seconds < 0) return '0:00:00';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function scoreColor(score) {
  if (score >= 14) return 'var(--c-success)';
  if (score >= 10) return 'var(--c-gold)';
  if (score > 5)  return 'var(--c-danger-zone)';
  return 'var(--c-eliminating)';
}

function stopTimer() {
  if (examState.timerInterval) {
    clearInterval(examState.timerInterval);
    examState.timerInterval = null;
  }
}

/* ─────────────────────────────────────────────
   SÉLECTEUR
───────────────────────────────────────────── */

function renderSelect(container) {
  const isPro = (window.AppState.getState('pro') || {}).isActive === true;
  const totalSessions = window.AppState.getState('gamification.totalSessions') || 0;
  const canFull = isPro || totalSessions >= 5;

  container.innerHTML = `
    <div class="exam-select-screen">
      <div class="exam-select-header">
        <h1 class="exam-select-title">Mode Examen</h1>
        <p class="exam-select-sub">Simulation en conditions réelles. Chronomètre. Pas de retour arrière.</p>
      </div>

      <div class="exam-tip-banner">
        <span>⚠️</span>
        <p>Une fois lancé, tu ne peux plus revenir en arrière ni consulter les explications. Comme le vrai examen.</p>
      </div>

      <div class="exam-configs">
        ${EXAM_CONFIGS.map(cfg => {
          const locked = cfg.id === 'complet' && !canFull;
          return `
          <button type="button" class="exam-config-card ${locked ? 'exam-config-locked' : ''}" data-exam-cfg="${cfg.id}" ${locked ? 'data-exam-pro="1"' : ''}>
            <div class="exam-config-top">
              <span class="exam-config-badge" style="background:${cfg.color}22;color:${cfg.color};border-color:${cfg.color}44">${cfg.badge}</span>
              ${cfg.coeff ? `<span class="exam-config-coeff">Coeff. ${cfg.coeff}</span>` : ''}
              ${locked ? '<span class="exam-config-lock">🔒 PRO</span>' : ''}
            </div>
            <p class="exam-config-label">${cfg.label}</p>
            <div class="exam-config-details">
              <span>⏱ ${Math.floor(cfg.duration / 60)} min</span>
              <span>📝 ${cfg.questionCount} questions</span>
              ${cfg.elimLimit ? `<span>⚠️ Élim. ≤ ${cfg.elimLimit}/20</span>` : ''}
            </div>
          </button>`;
        }).join('')}
      </div>

      ${totalSessions < 5 && !isPro ? `
        <div class="exam-unlock-tip">
          💡 Le mode Complet (EP1+EP2) se débloque après 5 sessions QCM ou avec PRO.
          Tu en es à <strong>${totalSessions}/5</strong>.
        </div>
      ` : ''}
    </div>
  `;

  container.querySelectorAll('[data-exam-cfg]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.hasAttribute('data-exam-pro')) {
        window.Paywall?.showModal?.();
        return;
      }
      const cfgId = btn.getAttribute('data-exam-cfg');
      examState.config = EXAM_CONFIGS.find(c => c.id === cfgId);
      renderBriefing(container);
    });
  });
}

/* ─────────────────────────────────────────────
   BRIEFING
───────────────────────────────────────────── */

function renderBriefing(container) {
  const cfg = examState.config;
  examState.phase = 'briefing';

  container.innerHTML = `
    <div class="exam-briefing">
      <div class="exam-briefing-badge" style="color:${cfg.color};border-color:${cfg.color}44;background:${cfg.color}11">${cfg.badge}</div>
      <h2 class="exam-briefing-title">${cfg.label}</h2>

      <div class="exam-briefing-rules">
        <div class="exam-rule">
          <span class="exam-rule-icon">⏱</span>
          <div>
            <p class="exam-rule-label">Durée</p>
            <p class="exam-rule-val">${Math.floor(cfg.duration / 60)} minutes</p>
          </div>
        </div>
        <div class="exam-rule">
          <span class="exam-rule-icon">📝</span>
          <div>
            <p class="exam-rule-label">Questions</p>
            <p class="exam-rule-val">${cfg.questionCount} QCM</p>
          </div>
        </div>
        <div class="exam-rule">
          <span class="exam-rule-icon">🚫</span>
          <div>
            <p class="exam-rule-label">Navigation</p>
            <p class="exam-rule-val">Pas de retour arrière</p>
          </div>
        </div>
        <div class="exam-rule">
          <span class="exam-rule-icon">⚠️</span>
          <div>
            <p class="exam-rule-label">Note éliminatoire</p>
            <p class="exam-rule-val">≤ 5/20</p>
          </div>
        </div>
      </div>

      <div class="exam-briefing-tip">
        <p>💡 ${cfg.tip}</p>
      </div>

      <div class="exam-briefing-actions">
        <button type="button" class="btn btn-primary btn-lg btn-full" id="exam-start-btn">
          Lancer l'examen →
        </button>
        <button type="button" class="btn btn-ghost btn-full" id="exam-cancel-btn">Annuler</button>
      </div>
    </div>
  `;

  container.querySelector('#exam-start-btn')?.addEventListener('click', () => {
    examState.questions = filterByConfig(cfg);
    if (examState.questions.length === 0) return;
    examState.index = 0;
    examState.answers = [];
    examState.startedAt = Date.now();
    examState.secondsLeft = cfg.duration;
    examState.phase = 'question';
    startTimer(container);
    renderQuestion(container);
  });

  container.querySelector('#exam-cancel-btn')?.addEventListener('click', () => {
    examState.phase = 'select';
    renderSelect(container);
  });
}

/* ─────────────────────────────────────────────
   QUESTION
───────────────────────────────────────────── */

function startTimer(container) {
  stopTimer();
  examState.timerInterval = setInterval(() => {
    examState.secondsLeft--;
    const el = document.getElementById('exam-timer');
    if (el) {
      el.textContent = formatTime(examState.secondsLeft);
      if (examState.secondsLeft <= 300) el.classList.add('exam-timer-urgent');
      if (examState.secondsLeft <= 60) el.classList.add('exam-timer-critical');
    }
    if (examState.secondsLeft <= 0) {
      stopTimer();
      finishExam(container);
    }
  }, 1000);
}

function renderQuestion(container) {
  _container = container;
  const q = examState.questions[examState.index];
  if (!q) { finishExam(container); return; }

  const total = examState.questions.length;
  const current = examState.index + 1;
  const pct = ((current - 1) / total) * 100;
  const cfg = examState.config;
  const answered = examState.answers.length;
  const notAnswered = total - answered;
  const LETTERS = ['A', 'B', 'C', 'D'];
  const epBadge = q.epreuve === 1 ? 'badge-ep1' : 'badge-ep2';

  container.innerHTML = `
    <div class="exam-question-screen">
      <div class="exam-question-header">
        <div class="exam-header-row">
          <span class="badge ${epBadge}">${q.epreuve === 1 ? 'EP1' : 'EP2'}</span>
          <div class="exam-progress-center">
            <div class="exam-progress-bar"><div class="exam-progress-fill" style="width:${pct}%;background:${cfg.color}"></div></div>
            <span class="exam-progress-txt">${current}/${total}</span>
          </div>
          <span id="exam-timer" class="exam-timer mono">${formatTime(examState.secondsLeft)}</span>
        </div>
      </div>

      <div class="exam-question-body">
        <p class="exam-question-num">Question ${current}</p>
        <p class="exam-question-text">${q.question}</p>
        <div class="exam-answers">
          ${(q.answers || []).map((ans, i) => `
            <button type="button" class="exam-answer-card" data-exam-ans="${i}">
              <span class="exam-answer-letter">${LETTERS[i]}</span>
              <span class="exam-answer-text">${ans}</span>
            </button>
          `).join('')}
        </div>
        <div id="exam-answer-feedback" class="exam-answer-feedback" style="display:none"></div>
      </div>

      <div class="exam-footer">
        <span class="exam-footer-info">${notAnswered} question${notAnswered > 1 ? 's' : ''} restante${notAnswered > 1 ? 's' : ''}</span>
        <button type="button" class="btn btn-ghost btn-sm" id="exam-quit-btn">Abandonner</button>
      </div>
    </div>
  `;

  container.querySelectorAll('[data-exam-ans]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.hasAttribute('data-exam-answered')) return;
      const selectedIdx = parseInt(btn.getAttribute('data-exam-ans'), 10);
      const isCorrect = selectedIdx === q.correct;
      examState.answers.push({ questionId: q.id, correct: isCorrect, selected: selectedIdx, correctIndex: q.correct, epreuve: q.epreuve, module: q.module });

      // Feedback visuel rapide (vert/rouge) — sans explication (conditions réelles)
      const allBtns = container.querySelectorAll('[data-exam-ans]');
      allBtns.forEach((b, i) => {
        b.setAttribute('data-exam-answered', '1');
        b.classList.remove('exam-answer-card');
        if (i === q.correct) b.classList.add('exam-ans-correct');
        else if (i === selectedIdx && !isCorrect) b.classList.add('exam-ans-wrong');
        else b.style.opacity = '0.4';
      });

      const feedback = container.querySelector('#exam-answer-feedback');
      if (feedback) {
        feedback.style.display = 'block';
        feedback.innerHTML = isCorrect
          ? `<div class="exam-fb-ok">✓ Bonne réponse</div>`
          : `<div class="exam-fb-ko">✗ Mauvaise réponse · La bonne : <strong>${'ABCD'[q.correct]}</strong></div>`;
      }

      setTimeout(() => {
        examState.index++;
        if (examState.index >= examState.questions.length) finishExam(container);
        else renderQuestion(container);
      }, 900);
    });
  });

  container.querySelector('#exam-quit-btn')?.addEventListener('click', () => {
    if (confirm('Abandonner cet examen ? Tes résultats partiels ne seront pas sauvegardés.')) {
      stopTimer();
      examState.phase = 'select';
      renderSelect(container);
    }
  });
}

/* ─────────────────────────────────────────────
   RÉSULTATS
───────────────────────────────────────────── */

function finishExam(container) {
  stopTimer();
  examState.phase = 'results';

  const answers = examState.answers;
  const cfg = examState.config;
  const total = examState.questions.length;
  const correct = answers.filter(a => a.correct).length;
  const wrong = answers.filter(a => !a.correct).length;
  const skipped = total - answers.length;
  const score = total > 0 ? Math.round((correct / total) * 20 * 10) / 10 : 0;
  const timeUsed = cfg.duration - examState.secondsLeft;
  const timeStr = formatTime(timeUsed);
  const isEliminating = score <= 5;
  const passed = score >= 7;

  // Par épreuve (pour le mode complet)
  const ep1Ans = answers.filter(a => a.epreuve === 1);
  const ep2Ans = answers.filter(a => a.epreuve === 2);
  const ep1Score = ep1Ans.length > 0 ? Math.round((ep1Ans.filter(a => a.correct).length / ep1Ans.length) * 20 * 10) / 10 : null;
  const ep2Score = ep2Ans.length > 0 ? Math.round((ep2Ans.filter(a => a.correct).length / ep2Ans.length) * 20 * 10) / 10 : null;

  // Enregistrement dans AppState
  if (cfg.epreuve === 'ep1' || cfg.epreuve === 'all') {
    if (ep1Ans.length > 0) window.AppState.dispatch('RECORD_SESSION_RESULT', { epreuve: 'ep1', part: 'dpg', correct: ep1Ans.filter(a => a.correct && a.module?.includes('DPG')).length, total: ep1Ans.filter(a => a.module?.includes('DPG')).length || ep1Ans.length, score: ep1Score ?? score });
  }
  if (cfg.epreuve === 'ep2' || cfg.epreuve === 'all') {
    if (ep2Ans.length > 0) window.AppState.dispatch('RECORD_SESSION_RESULT', { epreuve: 'ep2', part: 'pp', correct: ep2Ans.filter(a => a.correct).length, total: ep2Ans.length, score: ep2Score ?? score });
  }
  window.AppState.dispatch('INCREMENT_STREAK');
  window.AppState.dispatch('ADD_XP', { amount: correct * 10 + (score >= 14 ? 100 : 0) });

  // Questions ratées
  const wrongDetails = answers
    .map((a, i) => ({ ...a, question: examState.questions[i] }))
    .filter(a => !a.correct);

  container.innerHTML = `
    <div class="exam-results-screen">
      <div class="exam-results-hero ${isEliminating ? 'exam-results-eliminating' : passed ? 'exam-results-pass' : 'exam-results-fail'}">
        <p class="exam-results-label">${cfg.badge} — ${cfg.label}</p>
        <div class="exam-score-display">
          <span class="exam-score-num mono" style="color:${scoreColor(score)}">${score.toFixed(1)}</span>
          <span class="exam-score-den">/20</span>
        </div>
        ${isEliminating ? '<div class="exam-badge-elim">⚠️ Note éliminatoire</div>' : passed ? '<div class="exam-badge-pass">✅ Admis à cette épreuve</div>' : '<div class="exam-badge-fail">📚 En dessous de la moyenne</div>'}
      </div>

      <div class="exam-results-stats">
        <div class="exam-result-stat">
          <span class="exam-result-stat-val" style="color:var(--c-success)">${correct}</span>
          <span class="exam-result-stat-lbl">Correctes</span>
        </div>
        <div class="exam-result-stat">
          <span class="exam-result-stat-val" style="color:var(--c-error)">${wrong}</span>
          <span class="exam-result-stat-lbl">Incorrectes</span>
        </div>
        ${skipped > 0 ? `<div class="exam-result-stat"><span class="exam-result-stat-val">${skipped}</span><span class="exam-result-stat-lbl">Non répondues</span></div>` : ''}
        <div class="exam-result-stat">
          <span class="exam-result-stat-val mono">${timeStr}</span>
          <span class="exam-result-stat-lbl">Temps utilisé</span>
        </div>
      </div>

      ${cfg.id === 'complet' && ep1Score !== null && ep2Score !== null ? `
        <div class="exam-results-breakdown">
          <h3 class="exam-results-breakdown-title">Détail par épreuve</h3>
          <div class="exam-breakdown-row">
            <div class="exam-breakdown-ep" style="border-color:var(--c-ep1)">
              <span class="exam-breakdown-label" style="color:var(--c-ep1)">EP1 · Coeff. 2</span>
              <span class="exam-breakdown-score mono" style="color:${scoreColor(ep1Score)}">${ep1Score.toFixed(1)}/20</span>
              ${ep1Score <= 5 ? '<span class="exam-breakdown-elim">⚠️ Éliminatoire</span>' : ''}
            </div>
            <div class="exam-breakdown-ep" style="border-color:var(--c-ep2)">
              <span class="exam-breakdown-label" style="color:var(--c-ep2)">EP2 · Coeff. 3</span>
              <span class="exam-breakdown-score mono" style="color:${scoreColor(ep2Score)}">${ep2Score.toFixed(1)}/20</span>
              ${ep2Score <= 5 ? '<span class="exam-breakdown-elim">⚠️ Éliminatoire</span>' : ''}
            </div>
            <div class="exam-breakdown-total">
              <span class="exam-breakdown-total-label">Score pondéré</span>
              <span class="exam-breakdown-total-val mono">${(ep1Score * 2 + ep2Score * 3).toFixed(0)}/100</span>
            </div>
          </div>
        </div>
      ` : ''}

      ${wrongDetails.length > 0 ? `
        <div class="exam-results-wrong">
          <h3 class="exam-results-wrong-title">Points à retravailler (${wrongDetails.length})</h3>
          <div class="exam-wrong-list">
            ${wrongDetails.slice(0, 10).map((a, i) => `
              <details class="exam-wrong-item">
                <summary class="exam-wrong-summary">
                  <span class="exam-wrong-num">${i + 1}</span>
                  <span class="exam-wrong-q">${(a.question?.question || '').slice(0, 70)}${a.question?.question?.length > 70 ? '…' : ''}</span>
                </summary>
                <div class="exam-wrong-detail">
                  <p class="exam-wrong-correct">✓ Bonne réponse : <strong>${'ABCD'[a.correctIndex]}</strong> — ${a.question?.answers?.[a.correctIndex] || ''}</p>
                  ${a.question?.explanation ? `<p class="exam-wrong-explanation">${a.question.explanation}</p>` : ''}
                  ${a.question?.trap ? `<p class="exam-wrong-trap">⚠️ Piège : ${a.question.trap}</p>` : ''}
                </div>
              </details>
            `).join('')}
            ${wrongDetails.length > 10 ? `<p class="exam-wrong-more">+ ${wrongDetails.length - 10} autres erreurs — lance une session QCM ciblée pour les retravailler.</p>` : ''}
          </div>
        </div>
      ` : `<div class="exam-results-perfect"><p>🏆 Parfait ! Aucune erreur.</p></div>`}

      <div class="exam-results-actions">
        <button type="button" class="btn btn-primary btn-full" id="exam-retry-btn">Rejouer →</button>
        <button type="button" class="btn btn-secondary btn-full" data-route="diagnostic">Voir mon diagnostic</button>
        <button type="button" class="btn btn-ghost btn-full" data-route="home">← Retour accueil</button>
      </div>
    </div>
  `;

  container.querySelector('#exam-retry-btn')?.addEventListener('click', () => {
    examState.phase = 'select';
    renderSelect(container);
  });
  container.querySelectorAll('[data-route]').forEach(btn => {
    btn.addEventListener('click', () => window.Router.navigate(`#${btn.getAttribute('data-route')}`));
  });
}

/* ─────────────────────────────────────────────
   POINT D'ENTRÉE
───────────────────────────────────────────── */

function render(container) {
  _container = container;
  stopTimer();
  examState.phase = 'select';
  examState.config = null;
  examState.questions = [];
  examState.index = 0;
  examState.answers = [];
  renderSelect(container);
}

window.ExamMode = { render };
