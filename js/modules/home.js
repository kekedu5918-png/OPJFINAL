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
  return `Encore debout${name} ? 🌙`;
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
  const count = [m1, m2, m3].filter(() => true).length;
  if (count === 0) return 0;
  return Math.round((m1 + m2 + m3) / 3);
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
 * Rendu du header sticky.
 * @returns {string}
 */
function renderHeader() {
  const streak = window.AppState.getState('gamification.streak') ?? 0;
  const grade = window.AppState.currentGrade();
  const pulseClass = streak > 7 ? 'home-streak-pulse' : '';
  const streakColor = streak > 0 ? '' : 'home-streak-zero';
  return `
    <header class="home-header">
      <button type="button" class="home-logo-btn" data-route="home" aria-label="Accueil">
        <img src="assets/icons/icon-192.png" alt="OPJ Examen" class="home-logo-img">
      </button>
      <span class="home-streak ${pulseClass} ${streakColor}">🔥 ${streak}</span>
      <button type="button" class="home-grade-badge" aria-label="Profil" data-route="profile" style="background-color: ${grade?.color || 'var(--c-border)'};"></button>
    </header>
  `;
}

/**
 * Rendu de la hero card.
 * @returns {string}
 */
function renderHeroCard() {
  const user = window.AppState.getState('user') || {};
  const prenom = (user.name || '').trim().split(/\s+/)[0] || '';
  const days = window.AppState.daysUntilExam();
  const totalScore = window.AppState.getTotalPredictedScore();
  const scores = EPREUVES.map((e) => ({ ...e, score: window.AppState.getPredictedScore(e.id) }));
  const eliminableIndex = [1, 2, 3].find((n) => window.AppState.isEpreuveEliminable(`ep${n}`));
  const greeting = getGreeting(prenom);
  const countdownClass = getCountdownClass(days);
  const ctaText = getSessionCtaText();
  const pro = window.AppState.getState('pro') || {};
  const isPro = pro.isActive === true;

  let countdownBlock = '';
  if (days != null) {
    countdownBlock = `
      <div class="home-countdown-wrap">
        <span class="home-countdown-num ${countdownClass}">${days}</span>
        <span class="home-countdown-label">JOURS AVANT L'EXAMEN</span>
      </div>
    `;
  } else {
    countdownBlock = `<button type="button" class="btn btn-ghost btn-md" data-route="train" data-set-exam="">📅 Définir ma date d'examen</button>`;
  }

  const pastilles = scores.map((s) => {
    const cl = getScoreClass(s.score);
    const disp = s.score != null ? s.score.toFixed(1) : '—';
    const warn = s.score != null && s.score <= 5 ? ' ⚠️' : '';
    return `<div class="home-pastille"><span class="home-pastille-label">${s.label}</span><span class="home-score mono ${cl}">${disp}${warn}</span></div>`;
  }).join('');

  const alertBanner = eliminableIndex ? `
    <div class="home-alert-eliminable">
      <span>🚨 Épreuve ${eliminableIndex} en zone éliminatoire (≤ 5/20). Révise maintenant.</span>
      <button type="button" class="btn btn-ghost btn-sm" data-route="train">Réviser →</button>
    </div>
  ` : '';

  const totalDisp = totalScore != null ? totalScore : '—';
  const totalPct = totalScore != null ? Math.min(100, (totalScore / 120) * 100) : 0;

  return `
    <div class="home-hero card">
      <p class="home-greeting">${greeting}</p>
      <div class="home-countdown-block">${countdownBlock}</div>
      <div class="home-pastilles">${pastilles}</div>
      ${alertBanner}
      <div class="home-total-wrap">
        <span class="home-total-label">Score projeté : <span class="mono">${totalDisp}</span>/120</span>
        <div class="progress-bar home-total-bar"><div class="progress-fill" style="width: ${totalPct}%;"></div></div>
        <span class="home-total-seuil">Seuil d'admission : 60/120</span>
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
  const globalPct = getGlobalMasteryPct();
  const ranking = '—';

  return `
    <div class="home-quick-stats">
      <div class="home-quick-stat card card-interactive">
        <span class="home-quick-stat-label">XP cette semaine</span>
        <span class="home-quick-stat-value mono">${weeklyXp}</span>
      </div>
      <div class="home-quick-stat card card-interactive">
        <span class="home-quick-stat-label">Maîtrise globale</span>
        <span class="home-quick-stat-value mono">${globalPct}%</span>
        <div class="progress-bar home-quick-progress"><div class="progress-fill" style="width: ${globalPct}%;"></div></div>
      </div>
      <div class="home-quick-stat card card-interactive">
        <span class="home-quick-stat-label">Classement</span>
        <span class="home-quick-stat-value mono">${ranking}</span>
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
  const lockQcm = !isPro;
  const lockFlash = !isPro;
  const lockLesson = !isPro;

  const qcmProgress = goal > 0 ? Math.min(100, (done / goal) * 100) : 0;
  const flashDisabled = dueCards === 0;

  return `
    <section class="home-section">
      <h2 class="home-section-title">Ta session du jour</h2>
      <div class="home-today-cards">
        <div class="home-today-card card card-interactive ${lockQcm ? 'home-card-locked' : ''}" data-route="train">
          ${lockQcm ? '<span class="home-card-lock" aria-hidden="true">🔒</span>' : ''}
          <span class="badge badge-ep1">EP1</span>
          <span class="home-today-card-main">${goal} questions</span>
          <div class="progress-bar"><div class="progress-fill" style="width: ${qcmProgress}%;"></div></div>
        </div>
        <div class="home-today-card card card-interactive ${flashDisabled ? 'home-today-card-disabled' : ''} ${lockFlash ? 'home-card-locked' : ''}" data-route="infractions">
          ${lockFlash ? '<span class="home-card-lock" aria-hidden="true">🔒</span>' : ''}
          <span class="home-today-card-main">🧠 ${dueCards} cartes à revoir</span>
        </div>
        <div class="home-today-card card card-interactive ${lockLesson ? 'home-card-locked' : ''}" data-route="learn">
          ${lockLesson ? '<span class="home-card-lock" aria-hidden="true">🔒</span>' : ''}
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
 * Rendu principal : injecte l'écran d'accueil dans le conteneur.
 * @param {HTMLElement} container - #screen-container
 */
function render(container) {
  container.innerHTML = `
    <div class="screen-home">
      ${renderHeader()}
      <div class="home-scroll">
        ${renderHeroCard()}
        ${renderQuickStats()}
        ${renderTodaySection()}
        ${renderEpreuvesSection()}
      </div>
    </div>
  `;

  container.querySelectorAll('[data-route]').forEach((el) => {
    el.addEventListener('click', () => {
      const route = el.getAttribute('data-route');
      if (route) window.Router.navigate(`#${route}`);
    });
  });
}
window.Home = { render };
