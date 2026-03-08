/**
 * OPJ EXAMEN — Onboarding (modèle Duolingo Gradual Engagement)
 * Valeur en < 3 minutes AVANT l'inscription.
 * Flow: Corps → Examen date → Diagnostic 7 questions → Plan → Inscription
 */

const TOTAL_STEPS = 6; // Corps · Date · Diagnostic · Résultats · Inscription · Go

const form = {
  name: '',
  corps: null,
  examDate: null,
  dailyGoal: 15,
  diagAnswers: [],
  diagScore: 0
};

let currentStep = 1;

/* ────────────────────────────────────────────────
   7 QUESTIONS DIAGNOSTIQUES (les plus testées)
──────────────────────────────────────────────── */
const DIAG_QUESTIONS = [
  {
    q: "Quelle est la durée initiale d'une garde à vue en droit commun ?",
    answers: ["12 heures", "24 heures", "48 heures", "72 heures"],
    correct: 1,
    theme: "GAV",
    expl: "Art. 63 CPP : 24h initiales, prolongeables 24h si ≥ 1 an d'emprisonnement."
  },
  {
    q: "Qui dirige la Police Judiciaire selon l'art. 12 CPP ?",
    answers: ["Le Procureur Général", "Le Juge d'instruction", "Le Procureur de la République", "Le Ministre de l'Intérieur"],
    correct: 2,
    theme: "DPG",
    expl: "Art. 12 CPP : La PJ est exercée sous la direction du Procureur de la République."
  },
  {
    q: "L'ITT est l'élément __ des violences volontaires qui détermine la qualification.",
    answers: ["Moral", "Matériel", "Légal", "Procédural"],
    correct: 2,
    theme: "DPS",
    expl: "L'ITT est l'ÉLÉMENT LÉGAL : elle détermine la qualification applicable (R624-1 · R625-1 · 222-11...)."
  },
  {
    q: "Combien d'heures dure au maximum une enquête de flagrance (hors dérogations) ?",
    answers: ["24 heures", "48 heures", "192 heures (8 jours)", "72 heures"],
    correct: 2,
    theme: "Flagrance",
    expl: "Art. 53 CPP : L'enquête de flagrance dure 8 jours (192 heures), renouvelable pour crimes organisés."
  },
  {
    q: "Quelle est la peine de base pour un meurtre simple (art. 221-1 CP) ?",
    answers: ["15 ans de réclusion", "20 ans de réclusion", "30 ans de réclusion", "La réclusion criminelle à perpétuité"],
    correct: 2,
    theme: "DPS",
    expl: "Art. 221-1 CP : le meurtre est puni de 30 ans de réclusion criminelle. Perpétuité = assassinat (préméditation)."
  },
  {
    q: "En enquête préliminaire, une perquisition sans assentiment nécessite une autorisation du :",
    answers: ["Procureur de la République", "Juge d'instruction", "Juge des libertés et de la détention", "Président du tribunal correctionnel"],
    correct: 2,
    theme: "Préliminaire",
    expl: "Art. 76 al. 4 CPP : le JLD autorise la perquisition si refus d'assentiment et infraction ≥ 5 ans."
  },
  {
    q: "La légitime défense (art. 122-5 CP) exige que l'acte soit simultané, nécessaire et :",
    answers: ["Autorisé par la hiérarchie", "Proportionné à l'attaque", "Déclaré au procureur", "Exercé par un OPJ uniquement"],
    correct: 1,
    theme: "DPG",
    expl: "Trois conditions : simultanéité · nécessité · proportionnalité. Applicable à tous, pas seulement aux OPJ."
  }
];

const THEMES_LABELS = {
  'GAV': 'Garde à vue',
  'DPG': 'Droit Pénal Général',
  'DPS': 'Droit Pénal Spécial',
  'Flagrance': 'Enquête de flagrance',
  'Préliminaire': 'Enquête préliminaire'
};

/* ────────────────────────────────────────────────
   UTILITAIRES
──────────────────────────────────────────────── */
function getExamMessage(days) {
  if (days < 0) return { text: `Date dans le passé — choisis une date future.`, cls: 'onboarding-date-eliminating' };
  if (days === 0) return { text: `Examen aujourd'hui !`, cls: 'onboarding-date-warning' };
  if (days > 90) return { text: `J-${days} — Tu as le temps, utilise-le bien.`, cls: 'onboarding-date-success' };
  if (days >= 30) return { text: `J-${days} — Mode intensif recommandé.`, cls: 'onboarding-date-warning' };
  return { text: `J-${days} — Dernière ligne droite !`, cls: 'onboarding-date-eliminating' };
}

function showXpToast(parent) {
  const el = document.createElement('div');
  el.className = 'toast toast-xp onboarding-xp-float';
  el.textContent = '+100 XP';
  parent.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}

function weeksForGoal(g) { return ({ 5: 20, 15: 7, 30: 4 })[g] ?? 7; }

/* ────────────────────────────────────────────────
   ÉCRANS
──────────────────────────────────────────────── */

/** Étape 1 — Corps (0-30s) */
function screen1() {
  const pn = form.corps === 'PN', gn = form.corps === 'GN';
  return `
    <div class="onb-hero-top">
      <div class="onb-shield">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <path d="M36 4L66 20V42C66 56 52 66 36 70C20 66 6 56 6 42V20L36 4Z" fill="rgba(245,166,35,0.12)" stroke="var(--c-gold)" stroke-width="2"/>
          <path d="M36 20L50 28V42L36 50L22 42V28L36 20Z" fill="rgba(245,166,35,0.08)" stroke="var(--c-gold)" stroke-width="1.2"/>
          <circle cx="36" cy="36" r="5" fill="var(--c-gold)"/>
        </svg>
      </div>
      <h1 class="onb-title">Qualification OPJ</h1>
      <p class="onb-sub">Quel est ton corps d'appartenance ?</p>
    </div>
    <div class="onb-corps-grid">
      <button type="button" class="onb-corps-card ${pn ? 'onb-corps-active' : ''}" data-corps="PN">
        <span class="onb-corps-emoji">🚓</span>
        <span class="onb-corps-name">Police Nationale</span>
        <span class="onb-corps-detail">EP3 : oral 20 min</span>
        ${pn ? '<span class="onb-corps-check">✓</span>' : ''}
      </button>
      <button type="button" class="onb-corps-card ${gn ? 'onb-corps-active' : ''}" data-corps="GN">
        <span class="onb-corps-emoji">🎖️</span>
        <span class="onb-corps-name">Gendarmerie Nationale</span>
        <span class="onb-corps-detail">EP3 : écrit 1h</span>
        ${gn ? '<span class="onb-corps-check">✓</span>' : ''}
      </button>
    </div>
    <p class="onb-corps-error" id="corps-error" style="display:none">Sélectionne ton corps pour continuer</p>
    <div class="onb-cta-wrap">
      <button type="button" class="btn btn-primary btn-lg btn-full" data-onboarding-next>Continuer →</button>
    </div>
  `;
}

/** Étape 2 — Date + objectif (30-60s) */
function screen2() {
  const value = form.examDate || '';
  const days = value ? Math.floor((new Date(value) - new Date()) / 86400000) : null;
  const msg = days !== null ? getExamMessage(days) : null;
  const today = new Date().toISOString().slice(0, 10);
  const g5 = form.dailyGoal === 5, g15 = form.dailyGoal === 15, g30 = form.dailyGoal === 30;
  const corpsTip = form.corps === 'GN' ? 'GN : examen généralement en automne.' : 'PN 2026 : 20 mai (session principale).';
  return `
    <h2 class="onb-heading">Quand est ton examen ?</h2>
    <p class="onb-step-sub">Je génère ton plan de révision personnalisé.</p>
    <input type="date" class="input onb-date-input" id="onb-exam-date" value="${value}" min="${today}" style="color-scheme:dark">
    ${msg ? `<p class="onb-date-msg ${msg.cls}">${msg.text}</p>` : '<p class="onb-date-msg onb-date-ph">← Sélectionne ta date</p>'}
    <p class="onb-corps-tip">💡 ${corpsTip}</p>
    <p class="onb-label">Ton objectif quotidien</p>
    <div class="onb-goals">
      <button type="button" class="onb-goal-card ${g5 ? 'onb-goal-active' : ''}" data-goal="5">
        <span class="onb-goal-icon">⚡</span><span class="onb-goal-txt">5 questions/jour</span><span class="onb-goal-sub">Jours chargés</span>
      </button>
      <button type="button" class="onb-goal-card ${g15 ? 'onb-goal-active' : ''}" data-goal="15">
        ${form.examDate && days !== null && days < 45 ? '' : '<span class="onb-goal-rec">⭐ Conseillé</span>'}
        <span class="onb-goal-icon">🎯</span><span class="onb-goal-txt">15 questions/jour</span><span class="onb-goal-sub">Équilibre idéal</span>
      </button>
      <button type="button" class="onb-goal-card ${g30 ? 'onb-goal-active' : ''}" data-goal="30">
        ${form.examDate && days !== null && days < 45 ? '<span class="onb-goal-rec">⭐ Conseillé</span>' : ''}
        <span class="onb-goal-icon">🏋️</span><span class="onb-goal-txt">30 questions/jour</span><span class="onb-goal-sub">Mode intensif</span>
      </button>
    </div>
    <div class="onb-cta-wrap">
      <button type="button" class="btn btn-primary btn-lg btn-full" data-onboarding-next>Tester mon niveau →</button>
      <button type="button" class="btn btn-ghost btn-sm" data-onboarding-skip>Passer (définir plus tard)</button>
    </div>
  `;
}

/** Étape 3 — Diagnostic 7 questions (60-180s) */
let diagIndex = 0;
let diagAnswers = [];

function screen3() {
  diagIndex = 0;
  diagAnswers = [];
  return renderDiagQuestion();
}

function renderDiagQuestion() {
  const q = DIAG_QUESTIONS[diagIndex];
  const pct = (diagIndex / DIAG_QUESTIONS.length) * 100;
  const LETTERS = ['A', 'B', 'C', 'D'];
  return `
    <div class="onb-diag-header">
      <p class="onb-diag-num">Question ${diagIndex + 1} / ${DIAG_QUESTIONS.length}</p>
      <div class="onb-diag-bar"><div class="onb-diag-fill" style="width:${pct}%"></div></div>
    </div>
    <p class="onb-diag-theme">${THEMES_LABELS[q.theme] || q.theme}</p>
    <p class="onb-diag-q">${q.q}</p>
    <div class="onb-diag-answers">
      ${q.answers.map((a, i) => `
        <button type="button" class="onb-diag-ans-btn" data-diag-ans="${i}">
          <span class="onb-diag-letter">${LETTERS[i]}</span>
          <span class="onb-diag-text">${a}</span>
        </button>
      `).join('')}
    </div>
  `;
}

/** Étape 4 — Résultats diagnostic + plan (180-240s) */
function screen4() {
  const total = DIAG_QUESTIONS.length;
  const correct = diagAnswers.filter(a => a.correct).length;
  const pct = Math.round((correct / total) * 100);
  form.diagScore = pct;
  form.diagAnswers = diagAnswers;

  // Analyse par thème
  const themes = {};
  DIAG_QUESTIONS.forEach((q, i) => {
    if (!themes[q.theme]) themes[q.theme] = { correct: 0, total: 0 };
    themes[q.theme].total++;
    if (diagAnswers[i]?.correct) themes[q.theme].correct++;
  });

  const weakThemes = Object.entries(themes).filter(([, v]) => v.correct / v.total < 0.6).map(([k]) => THEMES_LABELS[k] || k);
  const strongThemes = Object.entries(themes).filter(([, v]) => v.correct / v.total >= 0.8).map(([k]) => THEMES_LABELS[k] || k);

  const level = pct >= 80 ? { label: 'Expert', color: 'var(--c-success)', emoji: '🏆' }
    : pct >= 60 ? { label: 'Avancé', color: 'var(--c-gold)', emoji: '⭐' }
    : pct >= 40 ? { label: 'Intermédiaire', color: 'var(--c-ep2)', emoji: '📈' }
    : { label: 'Débutant', color: 'var(--c-ep1)', emoji: '🚀' };

  // Plan de révision
  const days = form.examDate ? Math.floor((new Date(form.examDate) - new Date()) / 86400000) : null;
  const weeks = days ? Math.ceil(days / 7) : null;
  const planText = weakThemes.length > 0
    ? `Focus sur : ${weakThemes.slice(0, 2).join(', ')}`
    : 'Programme complet · Maintenir ton niveau';

  return `
    <div class="onb-results">
      <div class="onb-results-score-wrap">
        <div class="onb-results-circle" style="--pct:${pct};--color:${level.color}">
          <span class="onb-results-num">${correct}/${total}</span>
          <span class="onb-results-label" style="color:${level.color}">${level.emoji} ${level.label}</span>
        </div>
      </div>

      <div class="onb-results-plan">
        <p class="onb-results-plan-title">📋 Ton plan de préparation</p>
        ${weakThemes.length > 0 ? `<div class="onb-results-weak">⚠️ Points à travailler : ${weakThemes.join(' · ')}</div>` : ''}
        ${strongThemes.length > 0 ? `<div class="onb-results-strong">✓ Points forts : ${strongThemes.join(' · ')}</div>` : ''}
        <p class="onb-results-strategy">${planText}</p>
        ${weeks ? `<p class="onb-results-weeks">À ${form.dailyGoal} questions/jour : programme couvert en <strong>${Math.min(weeks, weeksForGoal(form.dailyGoal))} semaines</strong></p>` : ''}
      </div>

      <div class="onb-cta-wrap">
        <button type="button" class="btn btn-primary btn-lg btn-full" data-onboarding-next>
          Sauvegarder ma progression →
        </button>
        <p class="onb-results-save-note">✨ Gratuit · Sans carte bancaire</p>
      </div>
    </div>
  `;
}

/** Étape 5 — Inscription (nom + prénom) */
function screen5() {
  return `
    <h2 class="onb-heading">Crée ton profil</h2>
    <p class="onb-step-sub">Pour sauvegarder ta progression et ton plan personnalisé.</p>
    <div class="onb-field">
      <label class="onb-label" for="onb-name">Ton prénom</label>
      <input type="text" class="input onb-input" id="onb-name" placeholder="Ex : Kévin" value="${form.name.replace(/"/g, '&quot;')}" maxlength="50" autocomplete="given-name" autofocus>
      <p class="onb-field-error" id="name-error" style="display:none">Entre ton prénom pour continuer</p>
    </div>
    <div class="onb-cta-wrap">
      <button type="button" class="btn btn-primary btn-lg btn-full" data-onboarding-next>Commencer →</button>
    </div>
    <p class="onb-legal">En continuant, tu acceptes les CGU. Tes données restent sur ton appareil.</p>
  `;
}

/** Étape 6 — Mission acceptée */
function screen6() {
  const firstName = form.name.trim() || 'toi';
  const pct = form.diagScore;
  const level = pct >= 80 ? 'Expert' : pct >= 60 ? 'Avancé' : pct >= 40 ? 'Intermédiaire' : 'Débutant';
  const isGN = form.corps === 'GN';
  const days = form.examDate ? Math.floor((new Date(form.examDate) - new Date()) / 86400000) : null;
  return `
    <div class="onb-success">
      <div class="onb-success-badge-wrap">
        <div class="onb-success-badge">Gardien Élève</div>
        <div class="onb-particles" aria-hidden="true">
          ${Array.from({ length: 8 }, (_, i) => `<span class="onboarding-particle" style="--angle:${i * 45}deg;animation-delay:${i * 0.04}s"></span>`).join('')}
        </div>
      </div>
      <div class="onb-xp-slot"></div>
      <p class="onb-success-title">Mission acceptée, ${firstName} !</p>
      <div class="onb-success-recap">
        <div class="onb-recap-item"><span>🎯</span><span>Niveau détecté : <strong>${level}</strong></span></div>
        <div class="onb-recap-item"><span>${isGN ? '🎖️' : '🚓'}</span><span>${isGN ? 'Gendarmerie Nationale' : 'Police Nationale'}</span></div>
        ${days !== null ? `<div class="onb-recap-item"><span>📅</span><span>Examen dans <strong>${days} jours</strong></span></div>` : ''}
        <div class="onb-recap-item"><span>⭐</span><span><strong>${form.dailyGoal} questions</strong> par jour</span></div>
      </div>
      <div class="onb-cta-wrap">
        <button type="button" class="btn btn-primary btn-lg btn-full" data-onboarding-start>Lancer ma préparation →</button>
      </div>
    </div>
  `;
}

/* ────────────────────────────────────────────────
   NAVIGATION
──────────────────────────────────────────────── */
function buildSlides() {
  return [screen1(), screen2(), '', '', screen5(), screen6()]
    .map((html, i) => `<div class="onboarding-slide onboarding-slide-${i + 1}">${html}</div>`).join('');
}

function goToStep(root, step) {
  const progressFill = root.querySelector('.onboarding-progress-fill');
  const counter = root.querySelector('.onboarding-step-counter');
  const backBtn = root.querySelector('.onboarding-back-btn');
  root.querySelectorAll('.onboarding-slide').forEach((s, i) => {
    s.classList.toggle('onboarding-slide-active', (i + 1) === step);
  });
  if (progressFill) progressFill.style.width = `${(step / TOTAL_STEPS) * 100}%`;
  if (counter) counter.textContent = `${step}/${TOTAL_STEPS}`;
  if (backBtn) backBtn.style.display = step > 1 ? 'flex' : 'none';
  currentStep = step;
  root.setAttribute('data-step', String(step));
  const active = root.querySelector('.onboarding-slide-active');
  if (active) active.scrollTop = 0;
}

function rebuildAndGo(root, step) {
  const slide = root.querySelector(`.onboarding-slide-${step}`);
  if (!slide) return;
  const builders = { 1: screen1, 2: screen2, 3: screen3, 4: screen4, 5: screen5, 6: screen6 };
  if (builders[step]) {
    slide.innerHTML = builders[step]();
    bindSlideEvents(root, step);
  }
  goToStep(root, step);
}

function bindSlideEvents(root, step) {
  if (step === 1) {
    root.querySelectorAll('.onb-corps-card').forEach(card => {
      card.addEventListener('click', () => {
        form.corps = card.getAttribute('data-corps');
        const sl = root.querySelector('.onboarding-slide-1');
        if (sl) { sl.innerHTML = screen1(); bindSlideEvents(root, 1); }
      });
    });
  }
  if (step === 2) {
    const inp = root.querySelector('#onb-exam-date');
    const msg = root.querySelector('.onb-date-msg');
    if (inp && msg) {
      inp.addEventListener('input', () => {
        form.examDate = inp.value || null;
        const d = form.examDate ? Math.floor((new Date(form.examDate) - new Date()) / 86400000) : null;
        const m = d !== null ? getExamMessage(d) : null;
        msg.textContent = m ? m.text : '← Sélectionne ta date';
        msg.className = `onb-date-msg ${m ? m.cls : 'onb-date-ph'}`;
      });
    }
    root.querySelectorAll('[data-goal]').forEach(btn => {
      btn.addEventListener('click', () => {
        form.dailyGoal = parseInt(btn.getAttribute('data-goal'));
        const sl = root.querySelector('.onboarding-slide-2');
        if (sl) { sl.innerHTML = screen2(); bindSlideEvents(root, 2); }
      });
    });
    root.querySelector('[data-onboarding-skip]')?.addEventListener('click', () => {
      form.examDate = null;
      rebuildAndGo(root, 3);
    });
  }
  if (step === 3) {
    // Diagnostic questions handled dynamically — bind answer buttons
    bindDiagAnswers(root);
  }
  if (step === 6) {
    const slot = root.querySelector('.onb-xp-slot');
    if (slot) setTimeout(() => showXpToast(slot), 500);
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

function bindDiagAnswers(root) {
  const slide = root.querySelector('.onboarding-slide-3');
  if (!slide) return;
  slide.querySelectorAll('[data-diag-ans]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.hasAttribute('data-answered')) return;
      const selected = parseInt(btn.getAttribute('data-diag-ans'));
      const q = DIAG_QUESTIONS[diagIndex];
      const isCorrect = selected === q.correct;
      diagAnswers[diagIndex] = { selected, correct: isCorrect };

      // Feedback visuel
      slide.querySelectorAll('[data-diag-ans]').forEach((b, i) => {
        b.setAttribute('data-answered', '1');
        if (i === q.correct) b.classList.add('onb-diag-ans-correct');
        else if (i === selected && !isCorrect) b.classList.add('onb-diag-ans-wrong');
        else b.style.opacity = '0.4';
      });

      // Explication brève
      const expl = document.createElement('div');
      expl.className = `onb-diag-expl ${isCorrect ? 'onb-diag-expl-ok' : 'onb-diag-expl-ko'}`;
      expl.textContent = (isCorrect ? '✓ ' : '✗ ') + q.expl;
      slide.querySelector('.onb-diag-answers')?.after(expl);

      setTimeout(() => {
        diagIndex++;
        if (diagIndex < DIAG_QUESTIONS.length) {
          slide.innerHTML = renderDiagQuestion();
          bindDiagAnswers(root);
          goToStep(root, 3);
        } else {
          // Diagnostic fini → résultats
          rebuildAndGo(root, 4);
        }
      }, 1400);
    });
  });
}

function bindEvents(root) {
  root.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-onboarding-next]');
    if (!btn) return;
    const step = parseInt(root.getAttribute('data-step') || '1');

    if (step === 1) {
      const corpsErr = root.querySelector('#corps-error');
      if (!form.corps) { if (corpsErr) corpsErr.style.display = 'block'; return; }
      if (corpsErr) corpsErr.style.display = 'none';
      rebuildAndGo(root, 2); return;
    }
    if (step === 2) {
      form.examDate = root.querySelector('#onb-exam-date')?.value || null;
      if (form.examDate) {
        const d = Math.floor((new Date(form.examDate) - new Date()) / 86400000);
        if (d < 0) return;
      }
      rebuildAndGo(root, 3); return;
    }
    if (step === 4) { rebuildAndGo(root, 5); return; }
    if (step === 5) {
      form.name = (root.querySelector('#onb-name')?.value || '').trim();
      const nameErr = root.querySelector('#name-error');
      if (!form.name) { if (nameErr) nameErr.style.display = 'block'; return; }
      if (nameErr) nameErr.style.display = 'none';
      rebuildAndGo(root, 6); return;
    }
  });

  root.querySelector('.onboarding-back-btn')?.addEventListener('click', () => {
    const step = parseInt(root.getAttribute('data-step') || '1');
    if (step <= 1) return;
    const prev = step === 4 ? 3 : step === 3 ? 2 : step - 1;
    rebuildAndGo(root, prev);
  });

  bindSlideEvents(root, 1);
}

function render(container) {
  currentStep = 1; diagIndex = 0; diagAnswers = [];
  form.name = ''; form.corps = null; form.examDate = null; form.dailyGoal = 15; form.diagScore = 0;

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
        <div class="onboarding-progress-fill" style="width:${(1 / TOTAL_STEPS) * 100}%"></div>
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
  goToStep(root, 1);
  bindEvents(root);
}

window.Onboarding = { render };
