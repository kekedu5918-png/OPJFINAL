/**
 * OPJ EXAMEN — Module Onboarding (5 étapes)
 * Slide horizontal, progress bar 1/5, enregistrement utilisateur et XP.
 */

const TOTAL_STEPS = 5;

/** Données du formulaire d'onboarding */
const form = {
  name: '',
  corps: null,
  examDate: null,
  dailyGoal: 15
};

/**
 * Calcule le nombre de semaines pour couvrir le programme selon l'objectif quotidien.
 * @param {number} dailyGoal - 5 | 15 | 30
 * @returns {number}
 */
function weeksForGoal(dailyGoal) {
  const map = { 5: 20, 15: 7, 30: 4 };
  return map[dailyGoal] ?? 7;
}

/**
 * Retourne le message J-X et la classe selon le nombre de jours.
 * @param {number} days
 * @returns {{ text: string, className: string }}
 */
function getExamMessage(days) {
  if (days > 90) return { text: `J-${days} — Tu as le temps.`, className: 'onboarding-date-success' };
  if (days >= 30) return { text: `J-${days} — Mode intensif.`, className: 'onboarding-date-warning' };
  return { text: `J-${days} — Dernière ligne droite.`, className: 'onboarding-date-eliminating' };
}

/**
 * Affiche le toast "+100 XP" puis le fait disparaître (xpFloat).
 * @param {HTMLElement} parent
 */
function showXpToast(parent) {
  const el = document.createElement('div');
  el.className = 'toast toast-xp onboarding-xp-float';
  el.textContent = '+100 XP';
  parent.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}

/**
 * Rendu de l'écran 1 — Briefing (contenu interne du slide).
 * @returns {string}
 */
function screen1() {
  return `
    <div class="onboarding-halo"></div>
    <div class="onboarding-badge-wrap stagger-1">
      <div class="onboarding-badge-glow"></div>
      <svg class="onboarding-badge-svg" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M40 4L72 22v36L40 76 8 58V22L40 4z" stroke="var(--c-gold)" stroke-width="2" fill="var(--c-bg-raised)"/>
        <path d="M40 24l20 10v20L40 56 20 54V34l20-10z" stroke="var(--c-gold)" stroke-width="1.5" fill="var(--c-gold-subtle)"/>
        <circle cx="40" cy="40" r="6" fill="var(--c-gold)"/>
      </svg>
    </div>
    <h1 class="onboarding-title stagger-2">Qualification OPJ.</h1>
    <p class="onboarding-subtitle stagger-3">L'examen le plus technique de la Police.<br>On va te préparer comme les meilleurs.</p>
    <div class="onboarding-cta-wrap stagger-4">
      <button type="button" class="btn btn-primary btn-lg btn-full" data-onboarding-next>Accepter la mission →</button>
    </div>
  `;
}

/**
 * Rendu de l'écran 2 — Profil (prénom + corps).
 * @returns {string}
 */
function screen2() {
  const pnSelected = form.corps === 'PN';
  const gnSelected = form.corps === 'GN';
  return `
    <label class="onboarding-label">Ton prénom</label>
    <input type="text" class="input onboarding-input" id="onboarding-name" placeholder="Ton prénom" value="${form.name.replace(/"/g, '&quot;')}" maxlength="50" autocomplete="given-name">
    <p class="onboarding-label onboarding-label-margin">Ton corps</p>
    <div class="onboarding-corps-row">
      <button type="button" class="card card-interactive onboarding-corps-card ${pnSelected ? 'card-gold onboarding-corps-selected' : ''}" data-corps="PN">
        <span class="onboarding-corps-emoji">🚓</span>
        <span class="onboarding-corps-name">Police Nationale</span>
        <span class="onboarding-corps-detail">Épreuve 3 : oral 20 min</span>
        ${pnSelected ? '<span class="onboarding-corps-check">✓</span>' : ''}
      </button>
      <button type="button" class="card card-interactive onboarding-corps-card ${gnSelected ? 'card-gold onboarding-corps-selected' : ''}" data-corps="GN">
        <span class="onboarding-corps-emoji">🎖️</span>
        <span class="onboarding-corps-name">Gendarmerie</span>
        <span class="onboarding-corps-detail">Épreuve 3 : écrit 1h</span>
        ${gnSelected ? '<span class="onboarding-corps-check">✓</span>' : ''}
      </button>
    </div>
    <div class="onboarding-cta-wrap">
      <button type="button" class="btn btn-primary btn-lg btn-full" data-onboarding-next>Continuer →</button>
    </div>
  `;
}

/**
 * Rendu de l'écran 3 — Date d'examen.
 * @returns {string}
 */
function screen3() {
  const value = form.examDate || '';
  const days = value ? Math.floor((new Date(value) - new Date()) / (24 * 60 * 60 * 1000)) : null;
  const msg = days != null ? getExamMessage(days) : null;
  return `
    <h2 class="onboarding-heading">Quand est ton examen ?</h2>
    <input type="date" class="input onboarding-date-input" id="onboarding-exam-date" value="${value}">
    ${msg ? `<p class="onboarding-date-message ${msg.className}">${msg.text}</p>` : '<p class="onboarding-date-message onboarding-date-placeholder">Choisis une date</p>'}
    <div class="onboarding-cta-wrap">
      <button type="button" class="btn btn-primary btn-lg btn-full" data-onboarding-next>C'est noté →</button>
    </div>
  `;
}

/**
 * Rendu de l'écran 4 — Objectif quotidien.
 * @returns {string}
 */
function screen4() {
  const g5 = form.dailyGoal === 5;
  const g15 = form.dailyGoal === 15;
  const g30 = form.dailyGoal === 30;
  const weeks = weeksForGoal(form.dailyGoal);
  return `
    <h2 class="onboarding-heading">Ton objectif quotidien</h2>
    <div class="onboarding-goals">
      <button type="button" class="card card-interactive onboarding-goal-card ${g5 ? 'card-gold onboarding-goal-selected' : ''}" data-goal="5">
        <span class="onboarding-goal-emoji">⚡</span>
        <span class="onboarding-goal-text">5 questions — 5 minutes</span>
        <span class="onboarding-goal-detail">les jours chargés</span>
      </button>
      <button type="button" class="card card-interactive card-gold onboarding-goal-card ${g15 ? 'onboarding-goal-selected' : ''}" data-goal="15">
        <span class="badge badge-pro onboarding-goal-badge">Recommandé</span>
        <span class="onboarding-goal-emoji">🎯</span>
        <span class="onboarding-goal-text">15 questions — 15 minutes</span>
        <span class="onboarding-goal-detail">équilibre idéal</span>
      </button>
      <button type="button" class="card card-interactive onboarding-goal-card ${g30 ? 'card-gold onboarding-goal-selected' : ''}" data-goal="30">
        <span class="onboarding-goal-emoji">🏋️</span>
        <span class="onboarding-goal-text">30 questions — 30 minutes</span>
        <span class="onboarding-goal-detail">mode warrior</span>
      </button>
    </div>
    ${form.dailyGoal ? `<p class="onboarding-weeks-text">À ce rythme : programme couvert en <strong>${weeks}</strong> semaines</p>` : ''}
    <div class="onboarding-cta-wrap">
      <button type="button" class="btn btn-primary btn-lg btn-full" data-onboarding-next>Je m'y engage →</button>
    </div>
  `;
}

/**
 * Rendu de l'écran 5 — Mission acceptée (badge, particules, toast XP, CTA).
 * @param {string} firstName - Prénom pour le message
 * @returns {string}
 */
function screen5(firstName) {
  return `
    <div class="onboarding-success-badge-wrap">
      <div class="onboarding-success-badge" aria-hidden="true">Gardien Élève</div>
      <div class="onboarding-particles" aria-hidden="true">
        ${Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * 360;
          const delay = i * 0.04;
          return `<span class="onboarding-particle" style="--angle: ${angle}deg; animation-delay: ${delay}s"></span>`;
        }).join('')}
      </div>
    </div>
    <div class="onboarding-xp-toast-slot"></div>
    <p class="onboarding-grade-text">Grade débloqué !</p>
    <p class="onboarding-success-text">Ta qualification OPJ commence maintenant, ${firstName || 'toi'}.</p>
    <p class="onboarding-success-sub">Priorité identifiée : Épreuve 2 — Procédure Pénale</p>
    <div class="onboarding-cta-wrap">
      <button type="button" class="btn btn-primary btn-lg btn-full" data-onboarding-start>Commencer →</button>
    </div>
  `;
}

/**
 * Construit le HTML des 5 slides (chaque slide est un div wrapper + contenu).
 * @returns {string}
 */
function buildSlides() {
  const contents = [screen1(), screen2(), screen3(), screen4(), screen5(form.name.trim() || 'toi')];
  return contents.map((html, i) => `<div class="onboarding-slide onboarding-slide-${i + 1}">${html}</div>`).join('');
}

/**
 * Met à jour la position du strip et la barre de progression.
 * @param {HTMLElement} root
 * @param {number} step
 */
function goToStep(root, step) {
  const strip = root.querySelector('.onboarding-strip');
  const progressFill = root.querySelector('.onboarding-progress-fill');
  if (!strip || !progressFill) return;
  const pct = (step / TOTAL_STEPS) * 100;
  strip.style.transform = `translateX(-${(step - 1) * 100}%)`;
  progressFill.style.width = `${pct}%`;
}

/**
 * Enregistre les événements sur la racine onboarding.
 * @param {HTMLElement} root
 */
function bindEvents(root) {
  const nextButtons = root.querySelectorAll('[data-onboarding-next]');
  nextButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      let step = parseInt(root.getAttribute('data-step') || '1', 10);
      if (step === 1) { step = 2; goToStep(root, step); root.setAttribute('data-step', '2'); return; }
      if (step === 2) {
        form.name = (root.querySelector('#onboarding-name')?.value || '').trim();
        if (!form.corps) return;
        step = 3;
        goToStep(root, step);
        root.setAttribute('data-step', '3');
        const slide3 = root.querySelector('.onboarding-slide-3');
        if (slide3) slide3.innerHTML = screen3();
        rebindScreen3(root);
        return;
      }
      if (step === 3) {
        form.examDate = root.querySelector('#onboarding-exam-date')?.value || null;
        step = 4;
        goToStep(root, step);
        root.setAttribute('data-step', '4');
        root.querySelector('.onboarding-slide-4').innerHTML = screen4();
        rebindScreen4(root);
        return;
      }
      if (step === 4) {
        step = 5;
        goToStep(root, step);
        root.setAttribute('data-step', '5');
        const slide5 = root.querySelector('.onboarding-slide-5');
        if (slide5) {
          slide5.innerHTML = screen5(form.name.trim() || 'toi');
          rebindScreen5(root);
        }
        return;
      }
    });
  });

  root.querySelectorAll('.onboarding-corps-card').forEach((card) => {
    card.addEventListener('click', () => {
      form.corps = card.getAttribute('data-corps') || null;
      const slide2 = root.querySelector('.onboarding-slide-2');
      if (slide2) slide2.innerHTML = screen2();
      bindEvents(root);
    });
  });

  root.querySelector('[data-onboarding-start]')?.addEventListener('click', () => {
    const name = form.name.trim() || '';
    const examDate = form.examDate || null;
    window.AppState.dispatch('INIT_USER', {
      name,
      corps: form.corps,
      examDate,
      dailyGoal: form.dailyGoal,
      onboardingDone: true
    });
    window.AppState.dispatch('ADD_XP', { amount: 100 });
    window.AppState.dispatch('UNLOCK_BADGE', 'first_mission');
    window.Router.navigate('#home');
    const nav = document.getElementById('nav-bar');
    if (nav) nav.style.display = '';
  });
}

function rebindScreen3(root) {
  const input = root.querySelector('#onboarding-exam-date');
  const msgEl = root.querySelector('.onboarding-date-message');
  if (!input || !msgEl) return;
  input.addEventListener('input', () => {
    form.examDate = input.value || null;
    const days = form.examDate ? Math.floor((new Date(form.examDate) - new Date()) / (24 * 60 * 60 * 1000)) : null;
    const msg = days != null ? getExamMessage(days) : null;
    if (msg) {
          msgEl.textContent = msg.text;
          msgEl.className = `onboarding-date-message ${msg.className}`;
        } else {
          msgEl.textContent = 'Choisis une date';
          msgEl.className = 'onboarding-date-message onboarding-date-placeholder';
        }
  });
}

function rebindScreen4(root) {
  root.querySelectorAll('.onboarding-goal-card').forEach((card) => {
    card.addEventListener('click', () => {
      form.dailyGoal = parseInt(card.getAttribute('data-goal') || '15', 10);
      const slide4 = root.querySelector('.onboarding-slide-4');
      if (slide4) {
        slide4.innerHTML = screen4();
        rebindScreen4(root);
      }
    });
  });
}

function rebindScreen5(root) {
  const slot = root.querySelector('.onboarding-xp-toast-slot');
  if (slot) showXpToast(slot);
  root.querySelector('[data-onboarding-start]')?.addEventListener('click', () => {
    const name = form.name.trim() || '';
    const examDate = form.examDate || null;
    window.AppState.dispatch('INIT_USER', {
      name,
      corps: form.corps,
      examDate,
      dailyGoal: form.dailyGoal,
      onboardingDone: true
    });
    window.AppState.dispatch('ADD_XP', { amount: 100 });
    window.AppState.dispatch('UNLOCK_BADGE', 'first_mission');
    window.Router.navigate('#home');
    const nav = document.getElementById('nav-bar');
    if (nav) nav.style.display = '';
  });
}

/**
 * Rendu principal : injecte les 5 écrans dans le conteneur et attache les événements.
 * @param {HTMLElement} container - Élément #screen-container
 */
function render(container) {
  container.innerHTML = '';
  const root = document.createElement('div');
  root.className = 'onboarding';
  root.setAttribute('data-step', '1');
  root.innerHTML = `
    <div class="onboarding-progress">
      <div class="onboarding-progress-fill" style="width: 20%;"></div>
    </div>
    <div class="onboarding-slides">
      <div class="onboarding-strip">
        ${buildSlides()}
      </div>
    </div>
  `;
  container.appendChild(root);
  bindEvents(root);
}
window.Onboarding = { render };
