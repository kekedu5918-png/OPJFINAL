/**
 * OPJ EXAMEN — Module Paywall
 * Limites freemium, 5 déclencheurs contextuels, modal PRO, essai gratuit J+3.
 */
 
const MODAL_CONTAINER_ID = 'modal-container';
const TOAST_CONTAINER_ID = 'toast-container';

/** Limites gratuites */
const LIMITS = {
  qcmSessionsToday: 3,
  lessonsAvailable: ['flagrance', 'gav'],
  ep1Locked: true,
  infractionsMax: 10,
  cartouchesMax: 3,
  compteRenduMax: 2,
  flashcardsPerDay: 10,
  explanationsLocked: false
};

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function isPro() {
  return (window.AppState.getState('pro') || {}).isActive === true;
}

/** Nombre de sessions QCM complétées aujourd'hui */
function getQcmSessionsToday() {
  if (isPro()) return 0;
  const today = getToday();
  const progress = window.AppState.getState('progress') || {};
  const sessions = [
    ...(progress.ep1?.dpg?.sessions || []),
    ...(progress.ep1?.dps?.sessions || []),
    ...(progress.ep2?.pp?.sessions || [])
  ].filter((s) => s && (s.date || '').slice(0, 10) === today);
  return sessions.length;
}

/** Peut lancer une nouvelle session QCM (sous limite du jour) */
function canAccessQcmSession() {
  if (isPro()) return true;
  return getQcmSessionsToday() < LIMITS.qcmSessionsToday;
}

/** Accès à l'Épreuve 1 (DPG/DPS) */
function canAccessEp1() {
  if (isPro()) return true;
  return !LIMITS.ep1Locked;
}

/** Accès à une leçon par id/slug */
function canAccessLesson(lessonId) {
  if (isPro()) return true;
  const allowed = LIMITS.lessonsAvailable || [];
  return allowed.some((id) => (lessonId || '').toLowerCase().includes(id));
}

/** Accès aux explications après QCM */
function canAccessExplanation() {
  if (isPro()) return true;
  return !LIMITS.explanationsLocked;
}

/** Nombre d'infractions déjà utilisées (au moins une carte SM-2) */
function getInfractionsUsed() {
  const sm2 = window.AppState.getState('progress.infractions.sm2') || {};
  const ids = new Set(Object.keys(sm2).map((k) => (k || '').split('_')[0]).filter(Boolean));
  return ids.size;
}
function canAccessInfractions() {
  if (isPro()) return true;
  return getInfractionsUsed() < LIMITS.infractionsMax;
}

/** Cartouches : nombre en mode apprentissage déjà fait */
function getCartouchesLearnedCount() {
  const learned = (window.AppState.getState('progress.cartouches') || {}).learned || [];
  return learned.length;
}
function canAccessCartoucheLearn() {
  if (isPro()) return true;
  return getCartouchesLearnedCount() < LIMITS.cartouchesMax;
}

/** Compte rendu : nombre de simulations faites */
function getCompteRenduCount() {
  const sims = window.AppState.getState('progress.ep3.simulations') || [];
  return sims.length;
}
function canAccessCompteRendu() {
  if (isPro()) return true;
  return getCompteRenduCount() < LIMITS.compteRenduMax;
}

/** Flashcards consultées aujourd'hui (approximation par infractions sm2 avec due aujourd'hui) */
function getFlashcardsUsedToday() {
  const sm2 = window.AppState.getState('progress.infractions.sm2') || {};
  const today = getToday();
  return Object.values(sm2).filter((v) => v && v.due === today).length;
}
function canAccessFlashcards() {
  if (isPro()) return true;
  return getFlashcardsUsedToday() < LIMITS.flashcardsPerDay;
}

/** Éligible à l'essai gratuit : J+3 et au moins 3 sessions et pas encore utilisé */
function canShowTrialOffer() {
  const pro = window.AppState.getState('pro') || {};
  if (pro.trialUsed || pro.isActive) return false;
  const user = window.AppState.getState('user') || {};
  const createdAt = user.createdAt ? new Date(user.createdAt) : null;
  if (!createdAt) return false;
  const now = new Date();
  const daysSince = (now - createdAt) / (24 * 60 * 60 * 1000);
  if (daysSince < 3) return false;
  const totalSessions = (window.AppState.getState('gamification') || {}).totalSessions || 0;
  return totalSessions >= 3;
}

// ─── Déclencheur 1 : Explication verrouillée (drawer après QCM gratuit) ───
/**
 * Affiche le drawer "Explication disponible avec PRO" (à la place de l'explication).
 * @param {HTMLElement} [anchor] - Conteneur optionnel (ex: écran QCM) pour y insérer le drawer
 * @param {function} [onLater] - Callback "Plus tard" (ex: passer à la question suivante)
 */
function showExplanationLockedDrawer(anchor, onLater) {
  const container = anchor || document.getElementById(MODAL_CONTAINER_ID);
  if (!container) return;

  const wrap = document.createElement('div');
  wrap.className = 'paywall-drawer-wrap';
  wrap.innerHTML = `
    <div class="paywall-drawer modal-sheet paywall-drawer-explanation" role="dialog" aria-label="Explication PRO">
      <span class="modal-handle"></span>
      <div class="paywall-drawer-inner">
        <p class="paywall-drawer-icon">🔒</p>
        <h3 class="paywall-drawer-title">Explication disponible avec PRO</h3>
        <p class="paywall-drawer-text">Les explications juridiques font la différence à l'examen.</p>
        <div class="paywall-drawer-actions">
          <button type="button" class="btn btn-primary btn-full paywall-btn-unlock" data-paywall-unlock>Débloquer les explications</button>
          <button type="button" class="btn btn-ghost paywall-btn-later" data-paywall-later>Plus tard</button>
        </div>
      </div>
    </div>
    <div class="paywall-drawer-overlay modal-overlay" data-paywall-overlay aria-hidden="true"></div>
  `;

  const close = () => {
    wrap.remove();
  };

  wrap.querySelector('[data-paywall-unlock]')?.addEventListener('click', () => {
    close();
    openProModal('explanation');
  });
  wrap.querySelector('[data-paywall-later]')?.addEventListener('click', () => {
    close();
    if (typeof onLater === 'function') onLater();
  });
  wrap.querySelector('[data-paywall-overlay]')?.addEventListener('click', () => {
    close();
    if (typeof onLater === 'function') onLater();
  });

  container.appendChild(wrap);
}

// ─── Déclencheur 2 : Épreuve 1 tentée ───
function showEp1LockedOverlay() {
  const container = document.getElementById(MODAL_CONTAINER_ID);
  if (!container) return;

  const wrap = document.createElement('div');
  wrap.className = 'paywall-overlay-wrap paywall-ep1-overlay';
  wrap.innerHTML = `
    <div class="paywall-ep1-card">
      <p class="paywall-ep1-icon">⚖️</p>
      <h2 class="paywall-ep1-title">L'Épreuve 1 représente 33% de ton score.</h2>
      <p class="paywall-ep1-text">Le Droit Pénal Général et Spécial est intégralement dans PRO.</p>
      <div class="paywall-ep1-actions">
        <button type="button" class="btn btn-primary btn-lg btn-full" data-paywall-unlock>Débloquer PRO</button>
        <button type="button" class="btn btn-ghost" data-paywall-stay>Rester sur l'Épreuve 2</button>
      </div>
    </div>
  `;

  wrap.querySelector('[data-paywall-unlock]')?.addEventListener('click', () => {
    wrap.remove();
    openProModal('ep1');
  });
  wrap.querySelector('[data-paywall-stay]')?.addEventListener('click', () => wrap.remove());
  container.appendChild(wrap);
}

// ─── Déclencheur 3 : Sessions du jour épuisées ───
function showSessionsExhaustedModal() {
  const container = document.getElementById(MODAL_CONTAINER_ID);
  if (!container) return;

  const wrap = document.createElement('div');
  wrap.className = 'paywall-modal-wrap';
  wrap.innerHTML = `
    <div class="modal-overlay paywall-sheet-overlay" data-paywall-close></div>
    <div class="modal-sheet paywall-sheet paywall-sessions-exhausted" role="dialog">
      <span class="modal-handle"></span>
      <p class="paywall-sheet-icon">🔥</p>
      <h2 class="paywall-sheet-title">3 sessions du jour complétées.</h2>
      <p class="paywall-sheet-text">Avec PRO, entraîne-toi sans limite. Tes rivaux ne s'arrêtent pas.</p>
      <div class="paywall-sheet-actions">
        <button type="button" class="btn btn-primary btn-lg btn-full" data-paywall-unlock>Passer PRO</button>
        <button type="button" class="btn btn-ghost" data-paywall-close>Revenir demain</button>
      </div>
    </div>
  `;

  const close = () => wrap.remove();
  wrap.querySelectorAll('[data-paywall-unlock]').forEach((el) => el.addEventListener('click', () => { close(); openProModal('sessions'); }));
  wrap.querySelectorAll('[data-paywall-close]').forEach((el) => el.addEventListener('click', close));
  container.appendChild(wrap);
}

// ─── Déclencheur 4 : Alerte éliminatoire (toast rouge persistant) ───
const EPREUVE_LABELS = { ep1: 'Épreuve 1', ep2: 'Épreuve 2', ep3: 'Épreuve 3' };

function showEliminatingToast(epreuve) {
  const container = document.getElementById(TOAST_CONTAINER_ID);
  if (!container) return;

  const label = EPREUVE_LABELS[epreuve] || epreuve;
  const el = document.createElement('div');
  el.className = 'toast toast-eliminating paywall-toast-eliminating';
  el.setAttribute('role', 'alert');
  el.innerHTML = `
    <div class="paywall-toast-content">
      <p class="paywall-toast-title">🚨 Zone éliminatoire sur ${label}.</p>
      <p class="paywall-toast-text">PRO te donne les explications pour comprendre et corriger.</p>
      <button type="button" class="btn btn-primary btn-sm paywall-toast-cta" data-paywall-unlock>Corriger mes lacunes — PRO</button>
    </div>
  `;

  el.querySelector('[data-paywall-unlock]')?.addEventListener('click', () => {
    el.remove();
    openProModal('eliminating');
  });
  container.appendChild(el);
}

// ─── Déclencheur 5 : Bon score (toast gold discret) ───
function showGoodScoreToast() {
  const container = document.getElementById(TOAST_CONTAINER_ID);
  if (!container) return;

  const el = document.createElement('div');
  el.className = 'toast toast-success paywall-toast-good';
  el.innerHTML = `
    <p class="paywall-toast-good-text">🏆 Excellent ! Prêt pour les annales OPJ ?</p>
    <button type="button" class="btn btn-ghost btn-sm" data-paywall-annales>Voir les annales PRO →</button>
  `;

  el.querySelector('[data-paywall-annales]')?.addEventListener('click', () => {
    el.remove();
    openProModal('annales');
  });
  container.appendChild(el);
  setTimeout(() => el.remove(), 8000);
}

// ─── Modal PRO (design complet) ───
const COMPARE_ROWS = [
  { free: '3 sessions QCM / jour', pro: 'Illimité' },
  { free: 'Épreuve 2 (PP) uniquement', pro: 'Épreuve 1 + 2 + 3' },
  { free: 'Sans explications détaillées', pro: 'Explications juridiques' },
  { free: '10 infractions', pro: 'Toutes les infractions' },
  { free: '3 cartouches (apprentissage)', pro: 'Toutes + mode construction' },
  { free: '2 comptes rendu', pro: 'Illimité' },
  { free: '10 flashcards / jour', pro: 'Illimité' },
  { free: '—', pro: 'Annales & sujets type examen' }
];

function openProModal(source) {
  const container = document.getElementById(MODAL_CONTAINER_ID);
  if (!container) return;

  let plan = 'annual';

  const wrap = document.createElement('div');
  wrap.className = 'paywall-modal-wrap paywall-pro-modal-wrap';

  function renderContent() {
    const isAnnual = plan === 'annual';
    return `
      <div class="modal-overlay paywall-pro-overlay" data-paywall-close></div>
      <div class="paywall-pro-modal modal-sheet" role="dialog" aria-labelledby="paywall-pro-title">
        <span class="modal-handle"></span>
        <header class="paywall-pro-header">
          <h1 id="paywall-pro-title" class="paywall-pro-title">OPJ PRO</h1>
          <span class="badge paywall-pro-badge">PRO</span>
          <p class="paywall-pro-subtitle">L'offre qui fait la différence</p>
        </header>
        <div class="paywall-pro-toggle">
          <button type="button" class="btn ${!isAnnual ? 'paywall-toggle-active' : ''}" data-paywall-plan="monthly">Mensuel</button>
          <button type="button" class="btn ${isAnnual ? 'paywall-toggle-active' : ''}" data-paywall-plan="annual">Annuel <span class="paywall-toggle-badge">Économisez 50%</span></button>
        </div>
        <div class="paywall-pro-prices">
          <div class="card paywall-price-card ${!isAnnual ? 'card-gold' : ''}" data-paywall-select="monthly">
            <span class="paywall-price-amount">9,99€</span>
            <span class="paywall-price-period">/mois</span>
          </div>
          <div class="card paywall-price-card ${isAnnual ? 'card-gold' : ''}" data-paywall-select="annual">
            <span class="paywall-price-amount">59,99€</span>
            <span class="paywall-price-period">/an</span>
            <span class="paywall-price-highlight">Recommandé</span>
          </div>
          <div class="card paywall-price-card" data-paywall-select="coup-de-feu">
            <span class="paywall-price-amount">14,99€</span>
            <span class="paywall-price-period">coup de feu</span>
          </div>
        </div>
        <div class="paywall-pro-compare">
          <table class="paywall-compare-table">
            <thead><tr><th>Gratuit</th><th>PRO</th></tr></thead>
            <tbody>
              ${COMPARE_ROWS.map((r) => `<tr><td>${r.free}</td><td>${r.pro}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>
        <p class="paywall-pro-trial-badge">7 jours d'essai gratuit · Annulable à tout moment</p>
        <div class="paywall-pro-actions">
          <button type="button" class="btn btn-primary btn-lg btn-full" data-paywall-start-trial>Commencer l'essai gratuit →</button>
          <button type="button" class="btn btn-ghost" data-paywall-close>Plus tard</button>
        </div>
      </div>
    `;
  }

  wrap.innerHTML = renderContent();

  wrap.querySelectorAll('[data-paywall-plan], [data-paywall-select]').forEach((el) => {
    el.addEventListener('click', () => {
      const p = el.getAttribute('data-paywall-plan') || el.getAttribute('data-paywall-select');
      if (p) plan = p;
      wrap.innerHTML = renderContent();
      bindProModal();
    });
  });

  function bindProModal() {
    wrap.querySelectorAll('[data-paywall-close]').forEach((el) => el.addEventListener('click', () => wrap.remove()));
    wrap.querySelector('[data-paywall-start-trial]')?.addEventListener('click', () => {
      wrap.remove();
      window.AppState.dispatch('ACTIVATE_PRO', {
        plan,
        startedAt: new Date().toISOString(),
        expiresAt: null,
        trialUsed: true
      });
      openTrialSuccessToast();
    });
  }

  bindProModal();
  container.appendChild(wrap);
}

function openTrialSuccessToast() {
  const container = document.getElementById(TOAST_CONTAINER_ID);
  if (!container) return;
  const el = document.createElement('div');
  el.className = 'toast toast-success';
  el.textContent = '✓ Essai PRO activé — Bonne préparation !';
  container.appendChild(el);
  setTimeout(() => el.remove(), 4000);
}

// ─── Essai gratuit J+3 ───
function openTrialModal() {
  if (!canShowTrialOffer()) return;

  const container = document.getElementById(MODAL_CONTAINER_ID);
  if (!container) return;

  const wrap = document.createElement('div');
  wrap.className = 'paywall-modal-wrap paywall-trial-wrap';
  wrap.innerHTML = `
    <div class="modal-overlay" data-paywall-close></div>
    <div class="paywall-trial-modal modal-sheet" role="dialog">
      <span class="modal-handle"></span>
      <h2 class="paywall-trial-title">Essaie PRO 7 jours gratuitement.</h2>
      <label for="paywall-trial-email" class="paywall-trial-label">Email</label>
      <input type="email" id="paywall-trial-email" class="input paywall-trial-input" placeholder="ton@email.fr" autocomplete="email">
      <button type="button" class="btn btn-primary btn-lg btn-full" data-paywall-activate-trial>Activer mon essai gratuit</button>
      <p class="paywall-trial-nocard">Aucune carte bancaire requise.</p>
      <button type="button" class="btn btn-ghost" data-paywall-close>Plus tard</button>
    </div>
  `;

  wrap.querySelector('[data-paywall-activate-trial]')?.addEventListener('click', () => {
    const input = wrap.querySelector('#paywall-trial-email');
    const email = (input?.value || '').trim();
    if (!email) return;
    wrap.remove();
    window.AppState.dispatch('ACTIVATE_PRO', {
      plan: 'annual',
      startedAt: new Date().toISOString(),
      trialUsed: true,
      trialStartedAt: new Date().toISOString()
    });
    openTrialSuccessToast();
  });
  wrap.querySelectorAll('[data-paywall-close]').forEach((el) => el.addEventListener('click', () => wrap.remove()));
  container.appendChild(wrap);
}

/** À appeler au chargement de l'app : affiche l'offre essai J+3 si éligible */
function checkAndShowTrialModal() {
  if (canShowTrialOffer()) {
    const shown = sessionStorage.getItem('paywall_trial_shown');
    if (!shown) {
      sessionStorage.setItem('paywall_trial_shown', '1');
      setTimeout(openTrialModal, 1500);
    }
  }
}

function init() {}
window.Paywall = {
  LIMITS,
  getQcmSessionsToday,
  canAccessQcmSession,
  canAccessEp1,
  canAccessLesson,
  canAccessExplanation,
  getInfractionsUsed,
  canAccessInfractions,
  getCartouchesLearnedCount,
  canAccessCartoucheLearn,
  getCompteRenduCount,
  canAccessCompteRendu,
  getFlashcardsUsedToday,
  canAccessFlashcards,
  canShowTrialOffer,
  showExplanationLockedDrawer,
  showEp1LockedOverlay,
  showSessionsExhaustedModal,
  showEliminatingToast,
  showGoodScoreToast,
  openProModal,
  openTrialModal,
  checkAndShowTrialModal,
  init
};
