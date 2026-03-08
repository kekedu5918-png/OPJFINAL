/**
 * OPJ EXAMEN — Module Home (écran d'accueil)
 * Données depuis AppState uniquement. Header sticky, hero, stats, sections.
 */

const EPREUVES = [
  { id: 'ep1', label: 'DPG+DPS', short: 'EP1' },
  { id: 'ep2', label: 'PP', short: 'EP2' },
  { id: 'ep3', label: 'Oral/Écrit', short: 'EP3' }
];

/**
 * Salutation selon l'heure (6–12, 12–18, 18–22, 22–6).
 * @param {string} prenom
 * @returns {string}
 */
function getGreeting(prenom) {
  const h = new Date().getHours();
  const name = prenom ? ` ${prenom}` : '';
  if (h >= 6 && h < 12) return `Bonjour${name} 👮`;
  if (h >= 12 && h < 18) return `Bonne session${name} 👮`;
  if (h >= 18 && h < 22) return `Bonsoir${name} 👮`;
  return `Encore debout${name} 🌙`;
}

/**
 * Libellé CTA session selon l'heure.
 * @returns {string}
 */
function getSessionCtaText() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return 'Commencer ma session du matin';
  if (h >= 18 && h < 24) return 'Commencer ma session du soir';
  return 'Commencer ma session';
}

/**
 * Maîtrise en % (0–100) à partir du score prévu /20.
 * @param {string} epreuve
 * @returns {number}
 */
function getMasteryPct(epreuve) {
  const score = window.AppState.getPredictedScore(epreuve);
  if (score == null) return 0;
  return Math.round((score / 20) * 100);
}

/**
 * Maîtrise globale (moyenne des 3 épreuves).
 * @returns {number}
 */
function getGlobalMasteryPct() {
  const m1 = getMasteryPct('ep1');
  const m2 = getMasteryPct('ep2');
  const m3 = getMasteryPct('ep3');
  const values = [m1, m2, m3].filter(v => v > 0);
  const count = values.length;
  if (count === 0) return 0;
  return Math.round((m1 + m2 + m3) / count);
}

/**
 * Nombre de cartes SM2 à revoir aujourd'hui (due <= today).
 * @returns {number}
 */
function getDueFlashcardsCount() {
  const sm2 = window.AppState.getState('progress.infractions.sm2') || {};
  const today = new Date().toISOString().slice(0, 10);
  return Object.values(sm2).filter((c) => c && c.due && c.due <= today).length;
}

/**
 * Couleur du score selon la note /20.
 * @param {number|null} score
 * @returns {string} classe CSS
 */
function getScoreClass(score) {
  if (score == null) return 'home-score-empty';
  if (score >= 14) return 'home-score-success';
  if (score >= 7) return 'home-score-ok';
  if (score > 5) return 'home-score-danger';
  return 'home-score-eliminating';
}

/**
 * Couleur du compte à rebours selon les jours.
 * @param {number|null} days
 * @returns {string}
 */
function getCountdownClass(days) {
  if (days == null) return '';
  if (days > 30) return 'home-countdown-gold';
  if (days >= 10) return 'home-countdown-warning';
  return 'home-countdown-eliminating';
}

/**
 * Épreuve avec le plus faible mastery (pour "À réviser").
 * @returns {{ id: string, label: string, pct: number }[]} les 2 plus faibles
 */
function getWeakestEpreuves() {
  return EPREUVES.map((e) => ({ ...e, pct: getMasteryPct(e.id) }))
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 2);
}

/**
 * Leçon recommandée (dernière lue ou première non complétée).
 * Données depuis state — pas de source externe.
 * @returns {{ title: string, duration: string, id: string|null }}
 */
function getRecommendedLesson() {
  const completed = window.AppState.getState('progress.lessons.completed') || [];
  const lastRead = window.AppState.getState('progress.lessons.lastRead');
  if (lastRead) {
    return { title: 'Poursuivre une leçon', duration: '~5 min', id: lastRead };
  }
  return { title: 'Découvrir une leçon', duration: '~5 min', id: null };
}

/**
 * Nombre de questions aujourd'hui (objectif vs fait) — depuis dailyGoal et sessions du jour.
 * @returns {{ done: number, goal: number }}
 */
function getTodayProgress() {
  const goal = window.AppState.getState('user.dailyGoal') || 15;
  const state = window.AppState.getState();
  const today = new Date().toISOString().slice(0, 10);
  let done = 0;
  const sources = [
    state.progress?.ep1?.dpg?.sessions,
    state.progress?.ep1?.dps?.sessions,
    state.progress?.ep2?.pp?.sessions
  ];
  sources.forEach((sessions) => {
    if (Array.isArray(sessions)) sessions.forEach((s) => { if ((s.date || s.submittedAt || '').slice(0, 10) === today) done += s.total || 0; });
  });
  return { done, goal };
}

/**
 * Rendu du header home (compact, pas de duplication avec l'app-header global).
 * @returns {string}
 */
function renderHeader() {
  const streak = window.AppState.getState('gamification.streak') ?? 0;
  const grade = window.AppState.currentGrade();
  const pulseClass = streak > 7 ? 'home-streak-pulse' : '';
  const streakColor = streak > 0 ? '' : 'home-streak-zero';
  const user = window.AppState.getState('user') || {};
  const prenom = (user.name || '').trim().split(/\s+/)[0] || 'Agent';
  return `
    <div class="home-header">
      <div class="home-header-left">
        <p class="home-header-greeting">${getGreeting(prenom)}</p>
        <p class="home-header-grade" style="color:${grade?.color || 'var(--c-gold)'}">${grade?.name || 'Gardien Élève'}</p>
      </div>
      <div class="home-header-right">
        <span class="home-streak ${pulseClass} ${streakColor}" title="Série de jours">🔥 ${streak}</span>
        <button type="button" class="home-grade-badge" aria-label="Mon profil" data-route="profile" style="background: ${grade?.color || 'var(--c-border)'}22; border-color: ${grade?.color || 'var(--c-border)'}; color: ${grade?.color || 'var(--c-gold)'};">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </button>
      </div>
    </div>
  `;
}

/**
 * Hero card — adapte son contenu selon la maturité de l'utilisateur.
 */
function renderHeroCard() {
  const user = window.AppState.getState('user') || {};
  const prenom = (user.name || '').trim().split(/\s+/)[0] || '';
  const days = window.AppState.daysUntilExam();
  const totalScore = window.AppState.getTotalPredictedScore();
  const totalSessions = window.AppState.getState('gamification.totalSessions') || 0;
  const scores = EPREUVES.map((e) => ({ ...e, score: window.AppState.getPredictedScore(e.id) }));
  const eliminableIndex = [1, 2, 3].find((n) => window.AppState.isEpreuveEliminable(`ep${n}`));
  const ctaText = getSessionCtaText();
  const countdownClass = getCountdownClass(days);

  // Mode débutant (< 5 sessions) → message d'accueil et calibration
  if (totalSessions < 5) {
    const steps = [
      { done: totalSessions >= 1, label: 'Première session QCM' },
      { done: (window.AppState.getState('progress.lessons.completed') || []).length >= 1, label: 'Première leçon lue' },
      { done: totalSessions >= 3, label: '3 sessions pour calibrer' },
      { done: totalSessions >= 5, label: 'Score prévisionnel activé' }
    ];
    const doneCount = steps.filter(s => s.done).length;
    return `
      <div class="home-hero card home-hero-onboarding">
        <div class="home-hero-onb-top">
          <p class="home-hero-onb-welcome">Bienvenue ${prenom ? `, ${prenom}` : ''} 👋</p>
          <p class="home-hero-onb-sub">Commence par ces 4 étapes pour calibrer ton niveau</p>
        </div>
        <div class="home-onb-steps">
          ${steps.map(s => `
            <div class="home-onb-step ${s.done ? 'home-onb-step-done' : ''}">
              <span class="home-onb-step-check">${s.done ? '✓' : '○'}</span>
              <span class="home-onb-step-label">${s.label}</span>
            </div>
          `).join('')}
        </div>
        <div class="home-onb-progress-bar">
          <div class="home-onb-progress-fill" style="width:${(doneCount / 4) * 100}%"></div>
        </div>
        <p class="home-onb-progress-txt">${doneCount}/4 complétées</p>
        <button type="button" class="btn btn-primary btn-lg btn-full" data-route="train">
          ${totalSessions === 0 ? '🚀 Lancer ma première session' : '▶ Continuer ma préparation'}
        </button>
        ${days !== null && days >= 0 ? `<p class="home-onb-days">📅 Examen dans <strong>${days} jours</strong></p>` : `<button type="button" class="btn btn-ghost btn-sm" data-set-exam-date="">📅 Définir ma date d'examen</button>`}
      </div>
    `;
  }

  // Mode avancé → scores et progression
  let countdownBlock = days !== null && days >= 0
    ? `<div class="home-countdown-wrap"><span class="home-countdown-num ${countdownClass}">${days}</span><span class="home-countdown-label">JOURS</span></div>`
    : `<button type="button" class="btn btn-ghost btn-sm" data-set-exam-date="">📅 Date d'examen</button>`;

  const pastilles = scores.map((s) => {
    const cl = getScoreClass(s.score);
    const disp = s.score != null ? s.score.toFixed(1) : '—';
    const warn = s.score != null && s.score <= 5 ? ' ⚠️' : '';
    return `<div class="home-pastille"><span class="home-pastille-label">${s.short}</span><span class="home-score mono ${cl}">${disp}${warn}</span></div>`;
  }).join('');

  const alertBanner = eliminableIndex ? `
    <div class="home-alert-eliminable">
      <span>🚨 EP${eliminableIndex} zone éliminatoire ≤ 5/20</span>
      <button type="button" class="btn btn-ghost btn-sm" data-route="train">Réviser →</button>
    </div>
  ` : '';

  const totalDisp = totalScore != null ? Math.round(totalScore) : '—';
  const totalPct = totalScore != null ? Math.min(100, (totalScore / (window.AppState.getState('progress.ep3.simulations')?.length >= 5 ? 120 : 100)) * 100) : 0;
  const totalLabel = totalScore != null
    ? (window.AppState.getState('progress.ep3.simulations')?.length >= 5 ? `${totalDisp}/120` : `${totalDisp}/100 (EP1+EP2)`)
    : '—';

  return `
    <div class="home-hero card">
      <div class="home-hero-top">
        <div class="home-pastilles">${pastilles}</div>
        ${countdownBlock}
      </div>
      ${alertBanner}
      <div class="home-total-wrap">
        <div class="home-total-row">
          <span class="home-total-label">Score projeté</span>
          <span class="mono home-total-val ${totalScore !== null && totalScore >= 60 ? 'home-total-pass' : totalScore !== null ? 'home-total-fail' : ''}">${totalLabel}</span>
        </div>
        <div class="progress-bar home-total-bar">
          <div class="progress-fill ${totalScore !== null && totalScore >= 60 ? 'home-total-bar-pass' : ''}" style="width:${totalPct}%"></div>
        </div>
        <span class="home-total-seuil">Admission : 60/120 · Coeff. EP1×2 + EP2×3 + EP3×1</span>
      </div>
      <button type="button" class="btn btn-primary btn-lg btn-full home-cta-session" data-route="train">
        <svg class="home-cta-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
        ${ctaText}
      </button>
    </div>
  `;
}

/**
 * Rendu des 3 pastilles stats rapides (scroll horizontal).
 * @returns {string}
 */
function renderQuickStats() {
  const weeklyXp = window.AppState.getState('gamification.weeklyXP') ?? 0;
  const totalSessions = window.AppState.getState('gamification.totalSessions') ?? 0;
  const globalPct = getGlobalMasteryPct();
  const lessons = (window.AppState.getState('progress.lessons.completed') || []).length;

  return `
    <div class="home-quick-stats">
      <div class="home-quick-stat card" data-route="diagnostic">
        <span class="home-quick-stat-label">XP semaine</span>
        <span class="home-quick-stat-value mono" style="color:var(--c-gold)">${weeklyXp.toLocaleString()}</span>
      </div>
      <div class="home-quick-stat card" data-route="diagnostic">
        <span class="home-quick-stat-label">Maîtrise</span>
        <span class="home-quick-stat-value mono">${globalPct}%</span>
        <div class="progress-bar home-quick-progress"><div class="progress-fill" style="width: ${globalPct}%;"></div></div>
      </div>
      <div class="home-quick-stat card" data-route="profile">
        <span class="home-quick-stat-label">Sessions</span>
        <span class="home-quick-stat-value mono">${totalSessions}</span>
      </div>
      <div class="home-quick-stat card" data-route="learn">
        <span class="home-quick-stat-label">Leçons</span>
        <span class="home-quick-stat-value mono" style="color:var(--c-ep2)">${lessons}</span>
      </div>
    </div>
  `;
}

/**
 * Rendu section "Aujourd'hui" (QCM, Flashcards, Leçon).
 * @returns {string}
 */
function renderTodaySection() {
  const { done, goal } = getTodayProgress();
  const dueCards = getDueFlashcardsCount();
  const lesson = getRecommendedLesson();
  const pro = window.AppState.getState('pro') || {};
  const isPro = pro.isActive === true;
  // QCM EP2 gratuit : accessible jusqu'à 3 sessions/jour (plan freemium)
  const canQcm = window.Paywall?.canAccessQcmSession?.() !== false;
  const lockFlash = false; // Flashcards accessibles en gratuit (DPG/DPS verrouillés dedans)
  const lockLesson = false; // Leçons accessibles en gratuit (contenu PRO verrouillé dedans)

  const qcmProgress = goal > 0 ? Math.min(100, (done / goal) * 100) : 0;
  const flashDisabled = dueCards === 0;
  const sessionsLeft = canQcm ? (3 - (window.Paywall?.getQcmSessionsToday?.() ?? 0)) : 0;
  const qcmLabel = isPro ? `${goal} questions` : `${Math.max(0, sessionsLeft)} session${sessionsLeft !== 1 ? 's' : ''} restante${sessionsLeft !== 1 ? 's' : ''}`;

  return `
    <section class="home-section">
      <h2 class="home-section-title">Ta session du jour</h2>
      <div class="home-today-cards">
        <div class="home-today-card card card-interactive ${!canQcm ? 'home-card-locked' : ''}" data-route="train">
          ${!canQcm ? '<span class="home-card-lock" aria-hidden="true">🔒</span>' : ''}
          <span class="badge badge-ep2">QCM</span>
          <span class="home-today-card-main">${qcmLabel}</span>
          <div class="progress-bar"><div class="progress-fill" style="width: ${qcmProgress}%;"></div></div>
        </div>
        <div class="home-today-card card card-interactive ${flashDisabled ? 'home-today-card-disabled' : ''}" data-route="flashcards">
          <span class="home-today-card-main">🃏 ${dueCards > 0 ? `${dueCards} cartes dues` : 'Flashcards à jour ✓'}</span>
          <span class="home-today-card-meta">Répétition espacée</span>
        </div>
        <div class="home-today-card card card-interactive" data-route="learn">
          <span class="home-today-card-main">${lesson.title}</span>
          <span class="home-today-card-meta">${lesson.duration}</span>
        </div>
      </div>
    </section>
  `;
}

/**
 * Radar SVG : triangle équilatéral, 3 axes = EP1, EP2, EP3, polygone rempli.
 * @returns {string}
 */
function renderRadarSvg() {
  const m1 = getMasteryPct('ep1');
  const m2 = getMasteryPct('ep2');
  const m3 = getMasteryPct('ep3');
  const s1 = window.AppState.getPredictedScore('ep1');
  const s2 = window.AppState.getPredictedScore('ep2');
  const s3 = window.AppState.getPredictedScore('ep3');
  const score = (s) => (s != null ? s.toFixed(1) : '—');
  const cx = 50;
  const cy = 50;
  const r = 38;
  const rad = (d) => (d * Math.PI) / 180;
  const x = (angle, radius) => cx + radius * Math.cos(rad(angle));
  const y = (angle, radius) => cy + radius * Math.sin(rad(angle));
  const top = 270;
  const rightDown = 30;
  const leftDown = 150;
  const x1 = x(top, r);
  const y1 = y(top, r);
  const x2 = x(rightDown, r);
  const y2 = y(rightDown, r);
  const x3 = x(leftDown, r);
  const y3 = y(leftDown, r);
  const px1 = x(top, (r * m1) / 100);
  const py1 = y(top, (r * m1) / 100);
  const px2 = x(rightDown, (r * m2) / 100);
  const py2 = y(rightDown, (r * m2) / 100);
  const px3 = x(leftDown, (r * m3) / 100);
  const py3 = y(leftDown, (r * m3) / 100);
  const poly = `${cx},${cy} ${px1},${py1} ${px2},${py2} ${px3},${py3}`;
  const tri = `${x1},${y1} ${x2},${y2} ${x3},${y3}`;

  return `
    <svg class="home-radar-svg" viewBox="0 0 100 100" aria-hidden="true">
      <polygon points="${tri}" fill="none" stroke="var(--c-border-mid)" stroke-width="1"/>
      <polygon points="${poly}" fill="var(--c-gold)" fill-opacity="0.2" stroke="var(--c-gold)" stroke-width="1"/>
      <text x="50" y="12" text-anchor="middle" class="home-radar-label">EP1 ${score(s1)}/20</text>
      <text x="88" y="58" text-anchor="middle" class="home-radar-label">EP2 ${score(s2)}/20</text>
      <text x="12" y="58" text-anchor="middle" class="home-radar-label">EP3 ${score(s3)}/20</text>
    </svg>
  `;
}

/**
 * Rendu section "Tes épreuves" (radar + 2 cards À réviser).
 * @returns {string}
 */
function renderEpreuvesSection() {
  const weakest = getWeakestEpreuves();

  const reviseCards = weakest.map((e) => `
    <div class="home-revise-card card card-interactive" data-route="train">
      <span class="home-revise-title">${e.label}</span>
      <span class="home-revise-pct mono">${e.pct}% de maîtrise</span>
      <button type="button" class="btn btn-ghost btn-sm">Réviser →</button>
    </div>
  `).join('');

  return `
    <section class="home-section">
      <h2 class="home-section-title home-section-title-sm">Progression par épreuve</h2>
      <div class="home-radar-wrap">
        ${renderRadarSvg()}
      </div>
      <div class="home-revise-cards">
        ${reviseCards}
      </div>
    </section>
  `;
}

/**
 * Plan de révision personnalisé basé sur la date d'examen et les lacunes.
 */
function renderRevisionPlan() {
  const days = window.AppState.daysUntilExam();
  const ep1Score = window.AppState.getPredictedScore('ep1');
  const ep2Score = window.AppState.getPredictedScore('ep2');
  const ep3Score = window.AppState.getPredictedScore('ep3');
  const lessonsCompleted = (window.AppState.getState('progress.lessons.completed') || []).length;
  const totalSessions = window.AppState.getState('gamification.totalSessions') || 0;
  const goal = window.AppState.getState('user.dailyGoal') || 15;
  const { done } = getTodayProgress();
  const todayDone = done >= goal;

  // Génère les tâches du jour selon le niveau
  const tasks = [];

  if (!todayDone) {
    tasks.push({ icon: '🎯', label: `Session QCM (${goal} questions)`, done: false, route: 'train', urgent: ep2Score !== null && ep2Score < 10 });
  } else {
    tasks.push({ icon: '✅', label: `Session du jour complétée (${done}/${goal} questions)`, done: true, route: 'train', urgent: false });
  }

  if (lessonsCompleted < 3) {
    tasks.push({ icon: '📖', label: 'Lire une leçon de cours', done: false, route: 'learn', urgent: false });
  }

  if (ep2Score === null || ep2Score < 12) {
    tasks.push({ icon: '⚖️', label: 'EP2 Procédure Pénale — 5 questions', done: false, route: 'train', urgent: ep2Score !== null && ep2Score < 7 });
  }

  if (days !== null && days < 30) {
    tasks.push({ icon: '🏋️', label: 'Mode Examen — simulation conditions réelles', done: false, route: 'exam', urgent: true });
  }

  const dueCards = getDueFlashcardsCount();
  if (dueCards > 0) {
    tasks.push({ icon: '🃏', label: `${dueCards} flashcard${dueCards > 1 ? 's' : ''} à réviser`, done: false, route: 'flashcards', urgent: false });
  }

  if (ep3Score === null && totalSessions >= 5) {
    tasks.push({ icon: '🎤', label: 'Simuler un compte rendu EP3', done: false, route: 'compte-rendu', urgent: false });
  }

  // Message motivationnel selon le contexte
  let motivation = '';
  if (days !== null && days <= 7) motivation = '⚡ Dernière semaine — chaque session compte.';
  else if (days !== null && days <= 30) motivation = '🎯 Moins d\'un mois. Intensifie le rythme.';
  else if (ep1Score !== null && ep2Score !== null && ep1Score >= 14 && ep2Score >= 14) motivation = '🏆 Excellent niveau — maintiens la cadence.';
  else if (ep2Score !== null && ep2Score < 7) motivation = '🚨 EP2 en zone critique — priorité absolue.';

  if (tasks.length === 0) return '';

  return `
    <section class="home-section">
      <h2 class="home-section-title">📋 Plan du jour</h2>
      ${motivation ? `<p class="home-plan-motivation">${motivation}</p>` : ''}
      <div class="home-plan-tasks">
        ${tasks.slice(0, 5).map(t => `
          <button type="button" class="home-plan-task ${t.done ? 'home-plan-task-done' : ''} ${t.urgent ? 'home-plan-task-urgent' : ''}" data-route="${t.route}">
            <span class="home-plan-task-icon">${t.icon}</span>
            <span class="home-plan-task-label">${t.label}</span>
            ${t.urgent ? '<span class="home-plan-urgent-badge">URGENT</span>' : ''}
            ${t.done ? '<span class="home-plan-done-check">✓</span>' : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>'}
          </button>
        `).join('')}
      </div>
    </section>
  `;
}

/**
 * Section Actualités juridiques.
 */
function renderActusSection() {
  const actus = (window.ACTUS_JURIDIQUES || []).slice(0, 3);
  if (!actus.length) return '';
  return `
    <section class="home-section">
      <div class="home-section-header">
        <h2 class="home-section-title">📰 Réformes récentes</h2>
        <button type="button" class="btn btn-ghost btn-sm" data-route="actus">Tout voir</button>
      </div>
      <div class="home-actus">
        ${actus.map(a => `
          <div class="home-actu-card card" data-route="actus" data-actu-id="${a.id}">
            <div class="home-actu-top">
              <span class="home-actu-tag" style="background:${a.tagColor}22;color:${a.tagColor};border-color:${a.tagColor}44">${a.tag}</span>
              <span class="home-actu-date">${new Date(a.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })}</span>
            </div>
            <p class="home-actu-titre">${a.titre}</p>
            <p class="home-actu-impact">Impact examen : ${a.impactExamen.slice(0, 80)}…</p>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

/**
 * Rendu section "Outils complémentaires".
 */
/**
 * Cohorte par date d'examen.
 */
function renderCohortBanner() {
  const user = window.AppState.getState('user') || {};
  const days = window.AppState.daysUntilExam();
  if (days === null) return '';
  const corps = (user.corps || '').toUpperCase();
  const examDate = user.examDate ? new Date(user.examDate) : null;
  if (!examDate) return '';
  const month = examDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  const cohortName = `Promotion OPJ ${month} · ${corps || 'PN/GN'}`;
  const weeklyXP = window.AppState.getState('gamification.weeklyXP') || 0;
  return `
    <div class="home-cohort-banner" data-route="leaderboard">
      <div class="home-cohort-left">
        <span class="home-cohort-icon">👮</span>
        <div>
          <p class="home-cohort-name">${cohortName}</p>
          <p class="home-cohort-sub">${weeklyXP.toLocaleString()} XP cette semaine · Voir le classement →</p>
        </div>
      </div>
      <span class="home-cohort-arrow">›</span>
    </div>
  `;
}

/**
 * Widget streak + freeze visible en home.
 */
function renderStreakWidget() {
  const streak = window.AppState.getState('gamification.streak') || 0;
  const freezes = window.AppState.getState('gamification.streakFreezes') || 0;
  const lastDate = window.AppState.getState('gamification.lastStreakDate');
  const today = new Date().toISOString().slice(0, 10);
  const streakAtRisk = streak > 0 && lastDate !== today;
  if (streak < 2) return '';
  return `
    <div class="home-streak-widget ${streakAtRisk ? 'home-streak-at-risk' : ''}">
      <div class="home-streak-left">
        <span class="home-streak-fire ${streak >= 7 ? 'home-streak-big' : ''}">🔥</span>
        <div>
          <p class="home-streak-num"><strong>${streak}</strong> jours consécutifs</p>
          <p class="home-streak-sub">${streakAtRisk ? '⚠️ Ta série est en danger — révise aujourd\'hui !' : streak >= 7 ? 'Continue — tu es dans le top de ta brigade !' : 'Construis ta série !'}</p>
        </div>
      </div>
      ${freezes > 0 ? `
        <button type="button" class="home-streak-freeze-btn" data-use-freeze title="Utiliser un streak freeze">
          🧊 ×${freezes}
        </button>
      ` : ''}
    </div>
  `;
}

function renderToolsSection() {
  const tools = [
    { route: 'exam', icon: '🏋️', label: 'Mode Examen', desc: 'Conditions réelles' },
    { route: 'leaderboard', icon: '🏆', label: 'Classement', desc: 'Brigade hebdo' },
    { route: 'flashcards', icon: '🃏', label: 'Flashcards', desc: 'Répétition espacée' },
    { route: 'cas-pratique', icon: '✍️', label: 'Cas pratiques', desc: 'Entraînement écrit' },
    { route: 'diagnostic', icon: '📊', label: 'Diagnostic', desc: 'Tes résultats' },
    { route: 'infractions', icon: '⚖️', label: 'Infractions', desc: '42 infractions' },
    { route: 'cartouches', icon: '📋', label: 'Cartouches', desc: 'Procédures' },
    { route: 'compte-rendu', icon: '📝', label: 'Comptes rendus', desc: 'Simulation EP3' },
    { route: 'actus', icon: '📰', label: 'Actualités', desc: 'Réformes récentes' }
  ];
  return `
    <section class="home-section home-tools-section">
      <h2 class="home-section-title">Tous les outils</h2>
      <div class="home-tools-grid">
        ${tools.map(t => `
          <button type="button" class="home-tool-btn card card-interactive" data-route="${t.route}">
            <span class="home-tool-icon">${t.icon}</span>
            <span class="home-tool-label">${t.label}</span>
            <span class="home-tool-desc">${t.desc}</span>
          </button>
        `).join('')}
      </div>
    </section>
  `;
}

/**
 * Rendu principal : injecte l'écran d'accueil dans le conteneur.
 * @param {HTMLElement} container - #screen-container
 */
function render(container) {
  container.innerHTML = `
    <div class="screen-home">
      ${renderHeader()}
      <div class="home-scroll">
        ${renderStreakWidget()}
        ${renderHeroCard()}
        ${renderCohortBanner()}
        ${renderQuickStats()}
        ${renderRevisionPlan()}
        ${renderTodaySection()}
        ${renderEpreuvesSection()}
        ${renderActusSection()}
        ${renderToolsSection()}
      </div>
    </div>
  `;

  container.querySelectorAll('[data-route]').forEach((el) => {
    el.addEventListener('click', () => {
      const route = el.getAttribute('data-route');
      if (route) window.Router.navigate(`#${route}`);
    });
  });

  container.querySelector('[data-set-exam-date]')?.addEventListener('click', () => {
    showExamDatePicker(container);
  });

  container.querySelector('[data-use-freeze]')?.addEventListener('click', () => {
    const freezes = window.AppState.getState('gamification.streakFreezes') || 0;
    if (freezes > 0) {
      window.AppState.dispatch('USE_STREAK_FREEZE');
      window.AppState.dispatch('INCREMENT_STREAK');
      window.Home.render(container);
    }
  });
}

/**
 * Mini modal pour définir la date d'examen sans quitter l'écran.
 */
function showExamDatePicker(container) {
  const today = new Date().toISOString().slice(0, 10);
  const existing = document.getElementById('exam-date-modal');
  if (existing) existing.remove();
  const modal = document.createElement('div');
  modal.id = 'exam-date-modal';
  modal.className = 'exam-date-modal';
  modal.innerHTML = `
    <div class="exam-date-modal-inner">
      <h3 class="exam-date-modal-title">📅 Date de l'examen</h3>
      <p class="exam-date-modal-sub">Saisir ta date pour activer le compte à rebours</p>
      <input type="date" id="exam-date-input" class="exam-date-input" min="${today}" value="">
      <div class="exam-date-actions">
        <button type="button" class="btn btn-primary btn-full" id="exam-date-confirm">Confirmer</button>
        <button type="button" class="btn btn-ghost btn-full" id="exam-date-cancel">Annuler</button>
      </div>
      <p class="exam-date-tip">Examen PN : 20 mai 2026 · GN : dernier trimestre 2026</p>
    </div>
  `;
  document.getElementById('modal-container')?.appendChild(modal);
  requestAnimationFrame(() => modal.classList.add('exam-date-modal-visible'));

  modal.querySelector('#exam-date-confirm')?.addEventListener('click', () => {
    const val = modal.querySelector('#exam-date-input')?.value;
    if (val) {
      window.AppState.dispatch('UPDATE_USER', { examDate: val });
      modal.remove();
      window.Home.render(container);
    }
  });
  modal.querySelector('#exam-date-cancel')?.addEventListener('click', () => modal.remove());
}

window.Home = { render };
