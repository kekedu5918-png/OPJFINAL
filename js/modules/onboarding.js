/**
 * OPJ EXAMEN — Module Onboarding (5 étapes)
 * Navigation avant/arrière, validation, étape 5 personnalisée selon le profil.
 */

const TOTAL_STEPS = 5;

const form = {
  name: '',
  corps: null,
  examDate: null,
  dailyGoal: 15
};

let currentStep = 1;

function weeksForGoal(dailyGoal) {
  const map = { 5: 20, 15: 7, 30: 4 };
  return map[dailyGoal] ?? 7;
}

function getExamMessage(days) {
  if (days < 0) return { text: `Date dans le passé — choisis une date future.`, className: 'onboarding-date-eliminating' };
  if (days === 0) return { text: `Examen aujourd'hui ! Bonne chance.`, className: 'onboarding-date-warning' };
  if (days > 90) return { text: `J-${days} — Tu as le temps, utilise-le bien.`, className: 'onboarding-date-success' };
  if (days >= 30) return { text: `J-${days} — Mode intensif recommandé.`, className: 'onboarding-date-warning' };
  return { text: `J-${days} — Dernière ligne droite. Accélère.`, className: 'onboarding-date-eliminating' };
}

function showXpToast(parent) {
  const el = document.createElement('div');
  el.className = 'toast toast-xp onboarding-xp-float';
  el.textContent = '+100 XP';
  parent.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}

/** Étape 1 — Mission briefing */
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
    <div class="onboarding-features stagger-4">
      <div class="onboarding-feature"><span>⚖️</span><span>150 questions EP1 + EP2</span></div>
      <div class="onboarding-feature"><span>📋</span><span>Cartouches + Comptes rendus</span></div>
      <div class="onboarding-feature"><span>🃏</span><span>Flashcards SM-2 · Infractions</span></div>
    </div>
    <div class="onboarding-cta-wrap stagger-5">
      <button type="button" class="btn btn-primary btn-lg btn-full" data-onboarding-next>Accepter la mission →</button>
    </div>
  `;
}

/** Étape 2 — Profil prénom + corps */
function screen2() {
  const pnSelected = form.corps === 'PN';
  const gnSelected = form.corps === 'GN';
  return `
    <h2 class="onboarding-heading">Qui es-tu ?</h2>
    <div class="onboarding-field">
      <label class="onboarding-label" for="onboarding-name">Ton prénom</label>
      <input type="text" class="input onboarding-input" id="onboarding-name"
        placeholder="Ex : Kévin" value="${form.name.replace(/"/g, '&quot;')}"
        maxlength="50" autocomplete="given-name" autofocus>
      <p class="onboarding-field-error" id="name-error" style="display:none">Entre ton prénom pour continuer</p>
    </div>
    <p class="onboarding-label onboarding-label-margin">Ton corps d'appartenance</p>
    <div class="onboarding-corps-row">
      <button type="button" class="card card-interactive onboarding-corps-card ${pnSelected ? 'card-gold onboarding-corps-selected' : ''}" data-corps="PN">
        <span class="onboarding-corps-emoji">🚓</span>
        <span class="onboarding-corps-name">Police Nationale</span>
        <span class="onboarding-corps-detail">EP3 : oral 20 min</span>
        ${pnSelected ? '<span class="onboarding-corps-check">✓</span>' : ''}
      </button>
      <button type="button" class="card card-interactive onboarding-corps-card ${gnSelected ? 'card-gold onboarding-corps-selected' : ''}" data-corps="GN">
        <span class="onboarding-corps-emoji">🎖️</span>
        <span class="onboarding-corps-name">Gendarmerie Nationale</span>
        <span class="onboarding-corps-detail">EP3 : écrit 1h</span>
        ${gnSelected ? '<span class="onboarding-corps-check">✓</span>' : ''}
      </button>
    </div>
    <p class="onboarding-field-error" id="corps-error" style="display:none">Sélectionne ton corps pour continuer</p>
    <div class="onboarding-cta-wrap">
      <button type="button" class="btn btn-primary btn-lg btn-full" data-onboarding-next>Continuer →</button>
    </div>
  `;
}

/** Étape 3 — Date d'examen */
function screen3() {
  const value = form.examDate || '';
  const days = value ? Math.floor((new Date(value) - new Date()) / (24 * 60 * 60 * 1000)) : null;
  const msg = days != null ? getExamMessage(days) : null;
  const today = new Date().toISOString().slice(0, 10);
  const corpsTip = form.corps === 'GN'
    ? 'Examen GN : généralement en automne. Demande à ton unité.'
    : 'Examen PN 2026 : 20 mai 2026 (session principale).';
  return `
    <h2 class="onboarding-heading">Quand est ton examen ?</h2>
    <p class="onboarding-step-sub">Je vais adapter ton plan de révision à ta date.</p>
    <input type="date" class="input onboarding-date-input" id="onboarding-exam-date"
      value="${value}" min="${today}" color-scheme="dark">
    ${msg ? `<p class="onboarding-date-message ${msg.className}">${msg.text}</p>` : '<p class="onboarding-date-message onboarding-date-placeholder">← Sélectionne ta date</p>'}
    <p class="onboarding-corps-tip">💡 ${corpsTip}</p>
    <div class="onboarding-cta-wrap">
      <button type="button" class="btn btn-primary btn-lg btn-full" data-onboarding-next>C'est noté →</button>
      <button type="button" class="btn btn-ghost btn-full" data-onboarding-skip>Passer (définir plus tard)</button>
    </div>
  `;
}

/** Étape 4 — Objectif quotidien */
function screen4() {
  const g5 = form.dailyGoal === 5;
  const g15 = form.dailyGoal === 15;
  const g30 = form.dailyGoal === 30;
  const weeks = weeksForGoal(form.dailyGoal);
  const days = form.examDate ? Math.floor((new Date(form.examDate) - new Date()) / (24 * 60 * 60 * 1000)) : null;
  const urgentMode = days !== null && days < 45;
  return `
    <h2 class="onboarding-heading">Ton rythme de révision</h2>
    <p class="onboarding-step-sub">${urgentMode ? `⚡ Il te reste ${days} jours — l'intensif est conseillé.` : 'Combien de temps peux-tu y consacrer chaque jour ?'}</p>
    <div class="onboarding-goals">
      <button type="button" class="card card-interactive onboarding-goal-card ${g5 ? 'card-gold onboarding-goal-selected' : ''}" data-goal="5">
        <span class="onboarding-goal-emoji">⚡</span>
        <span class="onboarding-goal-text">5 questions / jour</span>
        <span class="onboarding-goal-detail">5 min · Jours chargés</span>
      </button>
      <button type="button" class="card card-interactive onboarding-goal-card ${g15 ? 'card-gold onboarding-goal-selected' : ''}" data-goal="15">
        ${!urgentMode ? '<span class="onboarding-goal-recommended">⭐ Recommandé</span>' : ''}
        <span class="onboarding-goal-emoji">🎯</span>
        <span class="onboarding-goal-text">15 questions / jour</span>
        <span class="onboarding-goal-detail">15 min · Équilibre idéal</span>
      </button>
      <button type="button" class="card card-interactive onboarding-goal-card ${g30 ? 'card-gold onboarding-goal-selected' : ''}" data-goal="30">
        ${urgentMode ? '<span class="onboarding-goal-recommended">⭐ Conseillé</span>' : ''}
        <span class="onboarding-goal-emoji">🏋️</span>
        <span class="onboarding-goal-text">30 questions / jour</span>
        <span class="onboarding-goal-detail">30 min · Mode intensif</span>
      </button>
    </div>
    <p class="onboarding-weeks-text">À ce rythme : programme couvert en <strong>${weeks} semaines</strong></p>
    <div class="onboarding-cta-wrap">
      <button type="button" class="btn btn-primary btn-lg btn-full" data-onboarding-next>Je m'y engage →</button>
    </div>
  `;
}

/** Étape 5 — Mission acceptée (personnalisée selon profil) */
function screen5() {
  const firstName = form.name.trim() || 'toi';
  const days = form.examDate ? Math.floor((new Date(form.examDate) - new Date()) / (24 * 60 * 60 * 1000)) : null;
  const isGN = form.corps === 'GN';

  // Priorité adaptée au profil
  let priorite, prioriteDetail;
  if (days !== null && days < 30) {
    priorite = 'Mode Coup de feu';
    prioriteDetail = 'Sessions quotidiennes intensives · Focus sur les erreurs fréquentes';
  } else if (isGN) {
    priorite = 'Priorité : Épreuve 2 + EP3 (écrit)';
    prioriteDetail = 'La PP est coefficient 3 en GN · Commence par les comptes rendus écrits';
  } else {
    priorite = 'Priorité : Épreuve 2 — Procédure Pénale';
    prioriteDetail = 'La PP est coefficient 3 · C\'est l\'épreuve la plus différenciante';
  }

  const planItems = [
    days !== null ? `📅 Examen dans ${days} jour${days > 1 ? 's' : ''}` : '📅 Date d\'examen à définir',
    `🎯 ${form.dailyGoal} questions par jour`,
    isGN ? '🎖️ Gendarmerie Nationale — EP3 écrit' : '🚓 Police Nationale — EP3 oral'
  ];

  return `
    <div class="onboarding-success-badge-wrap">
      <div class="onboarding-success-badge" aria-hidden="true">Gardien Élève</div>
      <div class="onboarding-particles" aria-hidden="true">
        ${Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * 360;
          return `<span class="onboarding-particle" style="--angle:${angle}deg;animation-delay:${i * 0.04}s"></span>`;
        }).join('')}
      </div>
    </div>
    <div class="onboarding-xp-toast-slot"></div>
    <p class="onboarding-grade-text">Mission acceptée, ${firstName} !</p>

    <div class="onboarding-plan-card">
      <p class="onboarding-plan-title">📋 Ton plan de préparation</p>
      <div class="onboarding-plan-items">
        ${planItems.map(item => `<p class="onboarding-plan-item">${item}</p>`).join('')}
      </div>
      <div class="onboarding-plan-divider"></div>
      <p class="onboarding-plan-focus">🎯 ${priorite}</p>
      <p class="onboarding-plan-detail">${prioriteDetail}</p>
    </div>

    <div class="onboarding-cta-wrap">
      <button type="button" class="btn btn-primary btn-lg btn-full" data-onboarding-start>Commencer ma préparation →</button>
    </div>
  `;
}

function buildSlides() {
  const contents = [screen1(), screen2(), screen3(), screen4(), screen5()];
  return contents.map((html, i) => `<div class="onboarding-slide onboarding-slide-${i + 1}">${html}</div>`).join('');
}

function goToStep(root, step, direction = 'forward') {
  const strip = root.querySelector('.onboarding-strip');
  const progressFill = root.querySelector('.onboarding-progress-fill');
  const backBtn = root.querySelector('.onboarding-back-btn');
  if (!strip || !progressFill) return;
  strip.style.transform = `translateX(-${(step - 1) * (100 / TOTAL_STEPS)}%)`;
  progressFill.style.width = `${(step / TOTAL_STEPS) * 100}%`;
  if (backBtn) backBtn.style.display = step > 1 ? 'flex' : 'none';
  currentStep = step;
  root.setAttribute('data-step', String(step));
}

function validateStep2(root) {
  const nameVal = (root.querySelector('#onboarding-name')?.value || '').trim();
  const nameErr = root.querySelector('#name-error');
  const corpsErr = root.querySelector('#corps-error');
  let valid = true;
  if (!nameVal) {
    if (nameErr) nameErr.style.display = 'block';
    valid = false;
  } else {
    if (nameErr) nameErr.style.display = 'none';
  }
  if (!form.corps) {
    if (corpsErr) corpsErr.style.display = 'block';
    valid = false;
  } else {
    if (corpsErr) corpsErr.style.display = 'none';
  }
  return valid;
}

function rebuildAndGo(root, step) {
  const selector = `.onboarding-slide-${step}`;
  const slide = root.querySelector(selector);
  if (!slide) return;
  const screens = { 2: screen2, 3: screen3, 4: screen4, 5: screen5 };
  if (screens[step]) {
    slide.innerHTML = screens[step]();
    bindSlideEvents(root, step);
  }
  goToStep(root, step);
}

function bindSlideEvents(root, step) {
  if (step === 2) {
    root.querySelectorAll('.onboarding-corps-card').forEach((card) => {
      card.addEventListener('click', () => {
        form.corps = card.getAttribute('data-corps') || null;
        const slide2 = root.querySelector('.onboarding-slide-2');
        if (slide2) { slide2.innerHTML = screen2(); bindSlideEvents(root, 2); }
      });
    });
  }
  if (step === 3) {
    const input = root.querySelector('#onboarding-exam-date');
    const msgEl = root.querySelector('.onboarding-date-message');
    if (input && msgEl) {
      input.addEventListener('input', () => {
        form.examDate = input.value || null;
        const days = form.examDate ? Math.floor((new Date(form.examDate) - new Date()) / 86400000) : null;
        const msg = days != null ? getExamMessage(days) : null;
        if (msg) { msgEl.textContent = msg.text; msgEl.className = `onboarding-date-message ${msg.className}`; }
        else { msgEl.textContent = '← Sélectionne ta date'; msgEl.className = 'onboarding-date-message onboarding-date-placeholder'; }
      });
    }
    root.querySelector('[data-onboarding-skip]')?.addEventListener('click', () => {
      form.examDate = null;
      rebuildAndGo(root, 4);
    });
  }
  if (step === 4) {
    root.querySelectorAll('.onboarding-goal-card').forEach((card) => {
      card.addEventListener('click', () => {
        form.dailyGoal = parseInt(card.getAttribute('data-goal') || '15', 10);
        const slide4 = root.querySelector('.onboarding-slide-4');
        if (slide4) { slide4.innerHTML = screen4(); bindSlideEvents(root, 4); }
      });
    });
  }
  if (step === 5) {
    const slot = root.querySelector('.onboarding-xp-toast-slot');
    if (slot) setTimeout(() => showXpToast(slot), 400);
    root.querySelector('[data-onboarding-start]')?.addEventListener('click', () => {
      window.AppState.dispatch('INIT_USER', {
        name: form.name.trim(),
        corps: form.corps,
        examDate: form.examDate || null,
        dailyGoal: form.dailyGoal,
        onboardingDone: true
      });
      window.AppState.dispatch('ADD_XP', { amount: 100 });
      window.AppState.dispatch('UNLOCK_BADGE', { id: 'first_session' });
      const nav = document.getElementById('nav-bar');
      const header = document.getElementById('app-header');
      if (nav) nav.style.display = '';
      if (header) header.style.display = '';
      window.Router.navigate('#home');
    });
  }
}

function bindEvents(root) {
  // Bouton suivant
  root.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-onboarding-next]');
    if (!btn) return;
    const step = parseInt(root.getAttribute('data-step') || '1', 10);

    if (step === 1) { rebuildAndGo(root, 2); return; }
    if (step === 2) {
      form.name = (root.querySelector('#onboarding-name')?.value || '').trim();
      if (!validateStep2(root)) return;
      rebuildAndGo(root, 3);
      return;
    }
    if (step === 3) {
      form.examDate = root.querySelector('#onboarding-exam-date')?.value || null;
      // Bloquer les dates passées
      if (form.examDate) {
        const days = Math.floor((new Date(form.examDate) - new Date()) / 86400000);
        if (days < 0) {
          const msgEl = root.querySelector('.onboarding-date-message');
          if (msgEl) { const m = getExamMessage(days); msgEl.textContent = m.text; msgEl.className = `onboarding-date-message ${m.className}`; }
          return;
        }
      }
      rebuildAndGo(root, 4);
      return;
    }
    if (step === 4) { rebuildAndGo(root, 5); return; }
  });

  // Bouton retour
  root.querySelector('.onboarding-back-btn')?.addEventListener('click', () => {
    const step = parseInt(root.getAttribute('data-step') || '1', 10);
    if (step <= 1) return;
    rebuildAndGo(root, step - 1);
  });

  // Corps cards init
  bindSlideEvents(root, 2);
}

function render(container) {
  currentStep = 1;
  form.name = ''; form.corps = null; form.examDate = null; form.dailyGoal = 15;

  container.innerHTML = '';
  const root = document.createElement('div');
  root.className = 'onboarding';
  root.setAttribute('data-step', '1');
  root.innerHTML = `
    <div class="onboarding-topbar">
      <button type="button" class="onboarding-back-btn" aria-label="Retour" style="display:none">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
      </button>
      <div class="onboarding-progress">
        <div class="onboarding-progress-fill" style="width:${(1 / TOTAL_STEPS) * 100}%;"></div>
      </div>
      <span class="onboarding-step-counter">1/${TOTAL_STEPS}</span>
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
