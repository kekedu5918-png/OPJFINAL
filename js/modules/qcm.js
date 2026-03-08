/**
 * OPJ EXAMEN — Moteur QCM
 * Sélecteur de session, écran question, résultats, sons (Web Audio API).
 */

const LETTERS = ['A', 'B', 'C', 'D'];
const XP_PER_CORRECT = 10;
const COMBO_MULTIPLIERS = { 3: 1.5, 5: 2, 10: 3 };

/** État de la session en cours */
let sessionState = {
  questions: [],
  index: 0,
  answers: [],
  startedAt: null,
  epreuveFilter: null,
  comboCount: 0
};

let currentContainer = null;

/**
 * Toutes les questions (EP1 + EP2).
 * @returns {Array<object>}
 */
function getAllQuestions() {
  return [...(window.QUESTIONS_EP1 || []), ...(window.QUESTIONS_EP2 || [])];
}

/**
 * Filtre les questions selon les critères du sélecteur.
 * @param {object} filters - { epreuve, difficulty, count }
 * @returns {Array<object>}
 */
function filterQuestions(filters) {
  let list = getAllQuestions();
  if (filters.epreuve === 'ep1_dpg') list = list.filter((q) => q.epreuve === 1 && (q.module || '').includes('DPG'));
  else if (filters.epreuve === 'ep1_dps') list = list.filter((q) => q.epreuve === 1 && (q.module || '').includes('DPS'));
  else if (filters.epreuve === 'ep2_pp') list = list.filter((q) => q.epreuve === 2);
  else if (filters.epreuve === 'complet') list = list;
  if (filters.difficulty && filters.difficulty !== 'all') list = list.filter((q) => q.difficulty === filters.difficulty);
  const shuffled = list.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(filters.count || 10, shuffled.length));
}

/**
 * Sons (Web Audio API) — lazy init sur premier geste (iOS exige un user gesture).
 */
let audioCtx = null;
function getAudioCtx() {
  if (audioCtx) return audioCtx;
  if (typeof AudioContext !== 'undefined' || typeof window.webkitAudioContext !== 'undefined') {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
  }
  return audioCtx;
}

function playSoundGood() {
  const ctx = getAudioCtx();
  if (!window.AppState.getState('settings.sound') || !ctx) return;
  try {
    const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(523, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(659, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.15);
  } catch (e) {}
}

function playSoundBad() {
  const ctx = getAudioCtx();
  if (!window.AppState.getState('settings.sound') || !ctx) return;
  try {
    const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sawtooth'; osc.frequency.setValueAtTime(200, ctx.currentTime);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.2);
  } catch (e) {}
}

function playSoundCombo() {
  const ctx = getAudioCtx();
  if (!window.AppState.getState('settings.sound') || !ctx) return;
  try {
    [523, 659, 784, 1047].forEach((freq, i) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
      gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.15);
      osc.start(ctx.currentTime + i * 0.08); osc.stop(ctx.currentTime + i * 0.08 + 0.15);
    });
  } catch (e) {}
}

function playSoundPerfect() {
  const ctx = getAudioCtx();
  if (!window.AppState.getState('settings.sound') || !ctx) return;
  try {
    [523, 587, 659, 698, 784].forEach((freq, i) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
      gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.12 + 0.2);
      osc.start(ctx.currentTime + i * 0.12); osc.stop(ctx.currentTime + i * 0.12 + 0.2);
    });
  } catch (e) {}
}

/**
 * Rendu écran 1 : Sélecteur de session.
 */
function renderSelector(container) {
  const pro = window.AppState.getState('pro') || {};
  const isPro = pro.isActive === true;
  const filters = sessionState.filters || { epreuve: 'all', difficulty: 'all', count: 10 };
  const count = Number(filters.count) || 10;
  const hasProFilter = filters.epreuve === 'complet' || filters.difficulty === '3';
  const locked = hasProFilter && !isPro;

  const epreuveLabels = [
    { value: 'all', label: 'Tout' },
    { value: 'ep1_dpg', label: 'Ep1 DPG' },
    { value: 'ep1_dps', label: 'Ep1 DPS' },
    { value: 'ep2_pp', label: 'Ep2 PP' },
    { value: 'complet', label: 'Complet' }
  ];
  const diffLabels = [
    { value: 'all', label: 'Tout' },
    { value: 1, label: 'Facile ⭐' },
    { value: 2, label: 'Moyen ⭐⭐' },
    { value: 3, label: 'Difficile ⭐⭐⭐' }
  ];
  const countOptions = [5, 10, 15, 20, 30];

  container.innerHTML = `
    <div class="qcm-selector">
      <h1 class="qcm-selector-title">Choisir une session</h1>
      <div class="qcm-filters">
        <p class="qcm-filter-label">Épreuve</p>
        <div class="qcm-filter-row">
          ${epreuveLabels.map((o) => `<button type="button" class="card card-interactive qcm-filter-card ${filters.epreuve === o.value ? 'card-gold' : ''}" data-qcm-epreuve="${o.value}">${o.label}</button>`).join('')}
        </div>
        <p class="qcm-filter-label">Difficulté</p>
        <div class="qcm-filter-row">
          ${diffLabels.map((o) => `<button type="button" class="card card-interactive qcm-filter-card ${filters.difficulty === String(o.value) ? 'card-gold' : ''}" data-qcm-diff="${o.value}">${o.label}</button>`).join('')}
        </div>
        <p class="qcm-filter-label">Nb questions</p>
        <div class="qcm-filter-row">
          ${countOptions.map((n) => `<button type="button" class="card card-interactive qcm-filter-card ${filters.count === n ? 'card-gold' : ''}" data-qcm-count="${n}">${n}</button>`).join('')}
        </div>
      </div>
      <p class="qcm-preview">Session : ${count} questions · ~${count} min</p>
      <div class="qcm-selector-cta-wrap ${locked ? 'qcm-locked-wrap' : ''}">
        ${locked ? '<span class="qcm-lock-overlay">🔒</span>' : ''}
        <button type="button" class="btn btn-primary btn-lg btn-full" data-qcm-launch>Lancer →</button>
      </div>
    </div>
  `;

  container.querySelectorAll('[data-qcm-epreuve]').forEach((el) => {
    el.addEventListener('click', () => {
      sessionState.filters = { ...sessionState.filters, epreuve: el.getAttribute('data-qcm-epreuve') };
      renderSelector(container);
    });
  });
  container.querySelectorAll('[data-qcm-diff]').forEach((el) => {
    el.addEventListener('click', () => {
      sessionState.filters = { ...sessionState.filters, difficulty: String(el.getAttribute('data-qcm-diff')) };
      renderSelector(container);
    });
  });
  container.querySelectorAll('[data-qcm-count]').forEach((el) => {
    el.addEventListener('click', () => {
      sessionState.filters = { ...sessionState.filters, count: Number(el.getAttribute('data-qcm-count')) };
      renderSelector(container);
    });
  });
  container.querySelector('[data-qcm-launch]')?.addEventListener('click', () => {
    if (locked) return;
    const f = sessionState.filters || { epreuve: 'all', difficulty: 'all', count: 10 };
    if ((f.epreuve === 'ep1_dpg' || f.epreuve === 'ep1_dps') && !window.Paywall.canAccessEp1()) {
      window.Paywall.showEp1LockedOverlay();
      return;
    }
    if (!window.Paywall.canAccessQcmSession()) {
      window.Paywall.showSessionsExhaustedModal();
      return;
    }
    sessionState.questions = filterQuestions({ epreuve: f.epreuve, difficulty: f.difficulty === 'all' ? null : Number(f.difficulty), count: f.count || 10 });
    sessionState.index = 0;
    sessionState.answers = [];
    sessionState.startedAt = new Date().toISOString();
    sessionState.comboCount = 0;
    sessionState.epreuveFilter = f.epreuve;
    if (sessionState.questions.length === 0) return;
    window.qcmActive = true;
    window.Router.navigate('#qcm');
    render(container);
  });
}

/**
 * Affiche un float "+XX XP" depuis l'élément.
 */
function showXpFloat(parent, amount) {
  const el = document.createElement('span');
  el.className = 'qcm-xp-float';
  el.textContent = `+${amount} XP`;
  parent.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}

/**
 * Affiche l'overlay combo (3, 5 ou 10).
 */
function showComboOverlay(container, level) {
  const wrap = container.querySelector('.qcm-combo-wrap') || (() => {
    const w = document.createElement('div');
    w.className = 'qcm-combo-wrap';
    container.appendChild(w);
    return w;
  })();
  if (!wrap.classList) return;
  const div = document.createElement('div');
  const mult = COMBO_MULTIPLIERS[level];
  const text = level >= 10 ? '+PARFAIT ×3' : `+COMBO ×${mult}`;
  div.className = level >= 10 ? 'qcm-combo-pill qcm-combo-perfect' : 'qcm-combo-pill';
  div.textContent = text;
  wrap.appendChild(div);
  setTimeout(() => div.remove(), 2500);
}

/**
 * Rendu écran 2 : Question en cours.
 */
function renderQuestion(container) {
  const q = sessionState.questions[sessionState.index];
  if (!q) {
    renderResults(container);
    return;
  }
  const total = sessionState.questions.length;
  const current = sessionState.index + 1;
  const correctSoFar = sessionState.answers.filter((a) => a.correct).length;
  const scoreSoFar = total > 0 ? ((correctSoFar / current) * 20).toFixed(1) : '—';
  const pct = (current / total) * 100;
  const badgeClass = q.epreuve === 1 ? 'badge-ep1' : 'badge-ep2';

  container.innerHTML = `
    <div class="qcm-question-screen">
      <header class="qcm-question-header">
        <button type="button" class="qcm-close-btn" aria-label="Quitter" data-qcm-close>✕</button>
        <div class="qcm-question-progress">
          <div class="progress-bar"><div class="progress-fill" style="width: ${pct}%;"></div></div>
        </div>
        <span class="badge ${badgeClass}">${q.epreuve === 1 ? 'EP1' : 'EP2'}</span>
        <span class="qcm-score-sofar mono">${scoreSoFar}/20</span>
      </header>
      <div class="qcm-question-body">
        <p class="qcm-question-meta">Question ${current} / ${total}</p>
        <p class="qcm-question-text">${q.question}</p>
        <div class="qcm-answers" data-qcm-answers>
          ${(q.answers || []).map((ans, i) => `
            <button type="button" class="card card-interactive qcm-answer-card" data-index="${i}" data-qcm-answer>
              <span class="qcm-answer-letter">${LETTERS[i]}</span>
              <span class="qcm-answer-text">${ans}</span>
            </button>
          `).join('')}
        </div>
      </div>
      <div class="qcm-combo-wrap" aria-hidden="true"></div>
      <div id="qcm-explication-drawer" class="qcm-drawer modal-sheet" style="display:none;">
        <span class="modal-handle"></span>
        <div class="qcm-drawer-content"></div>
      </div>
      <div class="qcm-modal-overlay qcm-drawer-overlay" id="qcm-drawer-overlay" style="display:none;" aria-hidden="true"></div>
    </div>
  `;

  const answersEl = container.querySelector('[data-qcm-answers]');
  const drawer = container.querySelector('#qcm-explication-drawer');
  const drawerContent = container.querySelector('.qcm-drawer-content');
  const overlay = container.querySelector('#qcm-drawer-overlay');

  // S'assure que le drawer est rendu dans #modal-container et que les z-index sont corrects
  const modalRoot = document.getElementById('modal-container');
  if (modalRoot && drawer && overlay && !modalRoot.contains(drawer)) {
    modalRoot.appendChild(overlay);
    modalRoot.appendChild(drawer);
  }
  if (overlay) overlay.style.zIndex = '200';
  if (drawer) drawer.style.zIndex = '210';

  const goNext = () => {
    if (drawer) drawer.style.display = 'none';
    if (overlay) overlay.style.display = 'none';
    sessionState.index++;
    render(container);
  };

  const openDrawer = (isCorrect, selectedIndex) => {
    const mult = sessionState.comboCount >= 10 ? 3 : sessionState.comboCount >= 5 ? 2 : sessionState.comboCount >= 3 ? 1.5 : 1;
    const xpGain = Math.round(XP_PER_CORRECT * (isCorrect ? mult : 0));
    if (isCorrect) window.AppState.dispatch('ADD_XP', { amount: xpGain });
    if (!window.Paywall.canAccessExplanation()) {
      window.Paywall.showExplanationLockedDrawer(document.getElementById('modal-container'), goNext);
      return;
    }
    const headerClass = isCorrect ? 'qcm-drawer-ok' : 'qcm-drawer-ko';
    const headerText = isCorrect ? '✓ Bonne réponse' : '✗ Pas tout à fait';
    const stars = '★'.repeat(q.difficulty || 1) + '☆'.repeat(3 - (q.difficulty || 1));
    drawerContent.innerHTML = `
      <p class="qcm-drawer-header ${headerClass}">${headerText}</p>
      <p class="qcm-drawer-explanation">${q.explanation || ''}</p>
      ${q.article ? `<button type="button" class="badge qcm-drawer-article">📖 ${q.article}</button>` : ''}
      ${q.trap ? `<div class="qcm-drawer-trap"><strong>⚠️ Piège :</strong> ${q.trap}</div>` : ''}
      <p class="qcm-drawer-diff">Difficulté : ${stars}</p>
      <button type="button" class="btn btn-primary btn-lg btn-full" data-qcm-next>Question suivante →</button>
    `;
    drawer.style.display = '';
    overlay.style.display = '';
    drawer.classList.add('qcm-drawer-visible');
    overlay.classList.add('qcm-drawer-visible');
    // Le drawer est dans #modal-container, donc on cherche dans document
    (drawer.querySelector('[data-qcm-next]') || document.querySelector('[data-qcm-next]'))?.addEventListener('click', goNext);
  };

  container.querySelectorAll('[data-qcm-answer]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.hasAttribute('data-answered')) return;
      const selectedIndex = parseInt(btn.getAttribute('data-index'), 10);
      const isCorrect = selectedIndex === q.correct;
      sessionState.answers.push({ questionId: q.id, correct: isCorrect, selectedIndex, correctIndex: q.correct });
      if (isCorrect) {
        window.AppState.dispatch('RECORD_COMBO');
        sessionState.comboCount = window.AppState.getState('gamification.comboCount') ?? 0;
        const mult = sessionState.comboCount >= 10 ? 3 : sessionState.comboCount >= 5 ? 2 : sessionState.comboCount >= 3 ? 1.5 : 1;
        const xp = Math.round(XP_PER_CORRECT * mult);
        showXpFloat(btn, xp);
        playSoundGood();
        if (sessionState.comboCount === 3 || sessionState.comboCount === 5 || sessionState.comboCount === 10) {
          showComboOverlay(container, sessionState.comboCount);
          playSoundCombo();
          if (sessionState.comboCount === 10) playSoundPerfect();
        }
      } else {
        window.AppState.dispatch('BREAK_COMBO');
        sessionState.comboCount = 0;
        playSoundBad();
      }
      const cards = container.querySelectorAll('.qcm-answer-card');
      cards.forEach((c, i) => {
        c.setAttribute('data-answered', '1');
        c.classList.remove('card-interactive');
        if (i === q.correct) c.classList.add('qcm-answer-correct');
        else if (i === selectedIndex && !isCorrect) {
          c.classList.add('qcm-answer-wrong');
          c.classList.add('anim-shake');
        } else if (i !== selectedIndex && i !== q.correct) c.style.opacity = '0.4';
        else if (i === q.correct && selectedIndex !== q.correct) c.classList.add('qcm-answer-correct-dim');
      });
      openDrawer(isCorrect, selectedIndex);
    });
  });

  container.querySelector('[data-qcm-close]')?.addEventListener('click', () => {
    showQcmQuitModal(() => {
      window.qcmActive = false;
      sessionState.questions = [];
      sessionState.index = 0;
      sessionState.answers = [];
      window.Router.navigate('#train');
    });
  });
}

/**
 * Enregistre la session dans AppState (par épreuve/part).
 */
function recordSessionResult() {
  const total = sessionState.questions.length;
  const correct = sessionState.answers.filter((a) => a.correct).length;
  const score = total ? (correct / total) * 20 : 0;
  const byPart = { ep1_dpg: { c: 0, t: 0 }, ep1_dps: { c: 0, t: 0 }, ep2_pp: { c: 0, t: 0 } };
  sessionState.questions.forEach((q, i) => {
    const a = sessionState.answers[i];
    if (!a) return;
    let part = null;
    if (q.epreuve === 1) part = (q.module || '').includes('DPG') ? 'ep1_dpg' : 'ep1_dps';
    else if (q.epreuve === 2) part = 'ep2_pp';
    if (part && byPart[part]) {
      byPart[part].t++;
      if (a.correct) byPart[part].c++;
    }
  });
  if (byPart.ep1_dpg.t > 0) window.AppState.dispatch('RECORD_SESSION_RESULT', { epreuve: 'ep1', part: 'dpg', correct: byPart.ep1_dpg.c, total: byPart.ep1_dpg.t, score: byPart.ep1_dpg.t ? (byPart.ep1_dpg.c / byPart.ep1_dpg.t) * 20 : 0 });
  if (byPart.ep1_dps.t > 0) window.AppState.dispatch('RECORD_SESSION_RESULT', { epreuve: 'ep1', part: 'dps', correct: byPart.ep1_dps.c, total: byPart.ep1_dps.t, score: byPart.ep1_dps.t ? (byPart.ep1_dps.c / byPart.ep1_dps.t) * 20 : 0 });
  if (byPart.ep2_pp.t > 0) window.AppState.dispatch('RECORD_SESSION_RESULT', { epreuve: 'ep2', part: 'pp', correct: byPart.ep2_pp.c, total: byPart.ep2_pp.t, score: byPart.ep2_pp.t ? (byPart.ep2_pp.c / byPart.ep2_pp.t) * 20 : 0 });
  const totalRecorded = byPart.ep1_dpg.t + byPart.ep1_dps.t + byPart.ep2_pp.t;
  if (totalRecorded === 0) window.AppState.dispatch('RECORD_SESSION_RESULT', { epreuve: 'ep2', part: 'pp', correct, total, score });
  window.AppState.dispatch('INCREMENT_STREAK');
}

/**
 * Rendu écran 3 : Résultats.
 */
function renderResults(container) {
  const total = sessionState.questions.length;
  const correct = sessionState.answers.filter((a) => a.correct).length;
  const score = total ? Math.round((correct / total) * 20 * 10) / 10 : 0;
  const xpGained = sessionState.answers.filter((a) => a.correct).length * XP_PER_CORRECT;
  recordSessionResult();
  // Badge session parfaite
  if (correct === total && total >= 5) {
    window.AppState.dispatch('UNLOCK_BADGE', { id: 'perfect_session' });
  }
  // Badge combo_10 (déjà déclenché dans le combo mais on s'assure ici aussi)
  if ((window.AppState.getState('gamification.comboCount') || 0) >= 10) {
    window.AppState.dispatch('UNLOCK_BADGE', { id: 'combo_10' });
  }
  window.Notifications.maybeAskPermissionAfterSession().catch(() => {});
  // Proposer les notifs après 3 sessions (prompt engageant)
  if (((window.AppState.getState('gamification.totalSessions') || 0) === 3) && !window.AppState.getState('settings.permissionAsked')) {
    setTimeout(() => window.Notifications.showPermissionPrompt?.(), 1500);
  }
  if (!window.Paywall.canAccessQcmSession()) window.Paywall.showSessionsExhaustedModal();
  if (score > 16) window.Paywall.showGoodScoreToast();
  const dangerEpreuve = score <= 5 ? (sessionState.questions[0]?.epreuve === 1 ? 'ep1' : 'ep2') : null;
  if (dangerEpreuve) window.Paywall.showEliminatingToast(dangerEpreuve);
  const wrong = sessionState.answers.map((a, i) => ({ ...a, question: sessionState.questions[i] })).filter((a) => !a.correct);
  const scoreClass = score >= 14 ? 'qcm-result-score-ok' : score >= 7 ? 'qcm-result-score-mid' : 'qcm-result-score-low';
  const showConfetti = score >= 18;
  const dangerEpreuveNum = score < 7 ? (sessionState.questions[0]?.epreuve === 1 ? 1 : 2) : null;

  container.innerHTML = `
    <div class="qcm-results-screen">
      <div class="qcm-result-score-wrap ${scoreClass}">
        <svg class="qcm-result-circle" viewBox="0 0 120 120">
          <circle class="qcm-result-circle-bg" cx="60" cy="60" r="54"/>
          <circle class="qcm-result-circle-fill" cx="60" cy="60" r="54" data-qcm-circle/>
        </svg>
        <div class="qcm-result-score-inner">
          <span class="qcm-result-num mono" data-qcm-num>0</span>
          <span class="qcm-result-den">/20</span>
        </div>
      </div>
      ${showConfetti ? '<div class="qcm-confetti" aria-hidden="true"></div>' : ''}
      <p class="qcm-result-xp">+${xpGained} XP</p>
      ${dangerEpreuveNum ? `<div class="card qcm-result-danger"><span>⚠️ Épreuve ${dangerEpreuveNum} : ${score}/20 — Zone à risque</span></div>` : ''}
      <div class="qcm-result-breakdown">
        <span>✓ ${correct} correctes</span>
        <span>✗ ${total - correct} incorrectes</span>
      </div>
      ${wrong.length > 0 ? `
        <div class="qcm-result-failed">
          <p class="qcm-result-failed-title">Questions ratées</p>
          <div class="qcm-result-accordion">
            ${wrong.map((a, i) => `
              <div class="qcm-accordion-item">
                <button type="button" class="qcm-accordion-btn" data-qcm-accordion="${i}">${(a.question?.question || '').slice(0, 50)}…</button>
                <div class="qcm-accordion-panel" style="display:none;">${a.question?.explanation || ''}</div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
      <div class="qcm-result-actions">
        <button type="button" class="btn btn-secondary" data-route="train">🔄 Rejouer</button>
        <button type="button" class="btn btn-ghost" data-qcm-share>📤 Partager</button>
        <button type="button" class="btn btn-ghost" data-route="home">← Retour</button>
      </div>
    </div>
  `;

  const circle = container.querySelector('[data-qcm-circle]');
  const numEl = container.querySelector('[data-qcm-num]');
  if (circle && numEl) {
    const circumference = 2 * Math.PI * 54;
    const pct = (score / 20) * 100;
    circle.setAttribute('stroke-dasharray', circumference);
    circle.setAttribute('stroke-dashoffset', circumference - (pct / 100) * circumference);
    let n = 0;
    const dur = 1200;
    const start = performance.now();
    const step = (t) => {
      const elapsed = t - start;
      n = Math.min(score, (elapsed / dur) * score);
      numEl.textContent = n.toFixed(1);
      if (elapsed < dur) requestAnimationFrame(step);
      else numEl.textContent = score.toFixed(1);
    };
    requestAnimationFrame(step);
  }

  if (showConfetti) {
    const confettiEl = container.querySelector('.qcm-confetti');
    if (confettiEl) {
      for (let i = 0; i < 20; i++) {
        const p = document.createElement('span');
        p.className = 'qcm-confetti-piece';
        p.style.cssText = `--delay: ${i * 0.05}s; --x: ${Math.random() * 100 - 50}px; --rot: ${Math.random() * 360}deg;`;
        confettiEl.appendChild(p);
      }
    }
  }

  container.querySelectorAll('[data-route]').forEach((el) => {
    el.addEventListener('click', () => window.Router.navigate(`#${el.getAttribute('data-route')}`));
  });
  container.querySelectorAll('[data-qcm-accordion]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    });
  });
  container.querySelector('[data-qcm-share]')?.addEventListener('click', () => {
    if (navigator.share) navigator.share({ title: 'OPJ Examen', text: `Score : ${score}/20 — ${correct}/${total} correctes` }).catch(() => {});
  });

  window.qcmActive = false;
  sessionState.questions = [];
  sessionState.index = 0;
  sessionState.answers = [];
}

/**
 * Point d'entrée : sélecteur (#train) ou question/résultats (#qcm).
 * @param {HTMLElement} container
 * @param {object} params - route params
 */
/**
 * Modal de confirmation pour quitter le QCM (remplace confirm() bloquant).
 */
function showQcmQuitModal(onConfirm) {
  const mc = document.getElementById('modal-container') || document.body;
  const el = document.createElement('div');
  el.className = 'qcm-quit-modal';
  el.innerHTML = `
    <div class="qcm-quit-inner">
      <p class="qcm-quit-title">Quitter la session ?</p>
      <p class="qcm-quit-sub">Ta progression de cette session ne sera pas sauvegardée.</p>
      <div class="qcm-quit-actions">
        <button type="button" class="btn btn-primary btn-full" id="qcm-quit-cancel">Continuer →</button>
        <button type="button" class="btn btn-ghost btn-full" id="qcm-quit-confirm">Quitter</button>
      </div>
    </div>
  `;
  mc.appendChild(el);
  requestAnimationFrame(() => el.classList.add('qcm-quit-visible'));
  el.querySelector('#qcm-quit-cancel')?.addEventListener('click', () => el.remove());
  el.querySelector('#qcm-quit-confirm')?.addEventListener('click', () => { el.remove(); onConfirm(); });
}

function render(container) {
  currentContainer = container;
  const route = window.Router.getCurrentRoute();
  if (route.name === 'train') {
    sessionState.filters = sessionState.filters || { epreuve: 'all', difficulty: 'all', count: 10 };
    renderSelector(container);
    return;
  }
  if (route.name === 'qcm') {
    if (sessionState.questions.length === 0 && sessionState.answers.length === 0) {
      window.Router.navigate('#train');
      return;
    }
    if (sessionState.index < sessionState.questions.length) renderQuestion(container);
    else renderResults(container);
  }
}
window.Qcm = { render };
