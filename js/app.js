/**
 * OPJ EXAMEN — Point d'entrée
 * Bootstrap : init state, SW, splash, router, onboarding / home.
 */

const SPLASH_DURATION_MS = 1500;
const SPLASH_ID = 'splash-screen';
const APP_ID = 'app';
const NAV_BAR_ID = 'nav-bar';
const APP_HEADER_ID = 'app-header';

/**
 * Masque le splash et affiche l'app avec une transition, puis démarre l'app.
 */
function hideSplash() {
  const splash = document.getElementById(SPLASH_ID);
  const app = document.getElementById(APP_ID);

  if (!splash || !app) {
    console.error('Éléments splash ou app introuvables');
    return;
  }

  splash.style.transition = 'opacity 0.4s ease';
  splash.style.opacity = '0';

  setTimeout(() => {
    splash.style.display = 'none';
    app.style.display = 'flex';
    app.style.flexDirection = 'column';
    startApp();
  }, 400);
}

/**
 * Enregistre le Service Worker (si disponible).
 */
function registerServiceWorker() {
  try {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  } catch (e) {
    // ignore
  }
}

/**
 * Met à jour l'état actif de la nav bottom.
 */
function updateNav(routeName) {
  const nav = document.getElementById(NAV_BAR_ID);
  if (!nav) return;
  nav.querySelectorAll('.nav-item').forEach((el) => {
    const route = el.getAttribute('data-route');
    el.classList.toggle('active', route === routeName);
  });
}

/**
 * Gère la visibilité du header (logo OPJ) et de la nav selon la route.
 */
function onRouteChange(route) {
  const header = document.getElementById(APP_HEADER_ID);
  const navBar = document.getElementById(NAV_BAR_ID);
  const name = typeof route === 'string' ? route : (route && route.name) || '';
  const normalized = name.startsWith('#') ? name : `#${name}`;
  const isOnboarding = normalized === '#onboarding';

  if (isOnboarding) {
    if (header) header.style.display = 'none';
    if (navBar) navBar.style.display = 'none';
  } else {
    if (header) header.style.display = 'flex';
    if (navBar) navBar.style.display = 'flex';
  }
}

/**
 * Écran onboarding minimal : 5 étapes à construire dans modules/onboarding.js.
 * Pour le bootstrap, on affiche une page de bienvenue avec bouton "Commencer".
 */
function renderOnboarding(container) {
  window.Onboarding.render(container);
}

/**
 * Écran d'accueil (module home.js).
 */
function renderHome(container) {
  window.Home.render(container);
}

/**
 * Enregistre les handlers de route (minimaux pour le bootstrap).
 */
function registerRoutes() {
  var router = window.Router;
  router.register('onboarding', renderOnboarding);
  router.register('home', renderHome);
  router.register('train', function(container) { window.Qcm.render(container); });
  router.register('qcm', function(container) { window.Qcm.render(container); });
  router.register('infractions', function(container) { window.Infractions.render(container); });
  router.register('cartouches', function(container, params) { window.Cartouches.render(container, params); });
  router.register('compte-rendu', function(container, params) { window.CompteRendu.render(container, params); });
  router.register('learn', function(container, params) { window.Lessons.render(container, params); });
  router.register('lesson', function(container, params) { window.Lessons.render(container, params); });
  router.register('flashcards', function(container) { window.Flashcards.render(container); });
  router.register('cas-pratique', function(container) { window.CasePratique.render(container); });
  router.register('diagnostic', function(container) { window.Diagnostic.render(container); });
  router.register('profile', function(container) { window.Gamification.render(container); });
  router.register('pro', function(container) { window.Paywall.showProScreen ? window.Paywall.showProScreen(container) : window.Paywall.showModal(container); });
  router.register('*', function(container, _params) {
    var name = router.getCurrentRoute().name;
    container.innerHTML = `<div class="screen-placeholder" style="padding: var(--s-8);"><p>Écran « ${name} »</p></div>`;
  });
}

/**
 * Démarre la partie router / services (AppState, SW, routes).
 */
function initAppCore() {
  try {
    if (window.AppState && window.AppState.load) {
      window.AppState.load();
    }
  } catch (e) {
    console.warn('Erreur AppState.load:', e);
  }

  registerServiceWorker();
  registerRoutes();
  window.Router.init();
  window.Router.onNavigate(function(route) {
    updateNav(route.name);
    onRouteChange(route);
  });
}

function startApp() {
  // Détermine si onboarding fait ou non
  let onboardingDone = false;
  try {
    const savedRaw = localStorage.getItem('opj_examen_state') || localStorage.getItem('opj_state');
    if (savedRaw) {
      const parsed = JSON.parse(savedRaw);
      onboardingDone = parsed?.user?.onboardingDone === true;
    }
  } catch (e) {
    console.warn('Erreur lecture state:', e);
  }

  const header = document.getElementById(APP_HEADER_ID);
  const navBar = document.getElementById(NAV_BAR_ID);

  if (onboardingDone) {
    if (header) header.style.display = 'flex';
    if (navBar) navBar.style.display = 'flex';
    if (window.Router && window.Router.navigate) {
      window.Router.navigate('home');
    } else {
      window.location.hash = '#home';
    }
    if (window.Paywall && typeof window.Paywall.checkAndShowTrialModal === 'function') {
      window.Paywall.checkAndShowTrialModal();
    }
  } else {
    if (header) header.style.display = 'none';
    if (navBar) navBar.style.display = 'none';
    if (window.Router && window.Router.navigate) {
      window.Router.navigate('onboarding');
    } else {
      window.location.hash = '#onboarding';
    }
  }
}

// Exposé globalement pour le bouton logo (header)
window.goHome = function () {
  // Si une session QCM est active, demander confirmation
  const qcmActive = window.qcmActive || false;
  if (qcmActive) {
    const confirmed = window.confirm('Quitter la session en cours ?');
    if (!confirmed) return;
    window.qcmActive = false;
  }
  // Navigation vers l'accueil selon le router disponible
  if (window.Router && window.Router.navigate) {
    window.Router.navigate('home');
  } else if (typeof window.navigateTo !== 'undefined') {
    window.navigateTo('home');
  } else {
    window.location.hash = '#home';
  }
};

/* Clic sur les items de la nav + démarrage principal */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById(NAV_BAR_ID)?.addEventListener('click', (e) => {
    const btn = e.target.closest('.nav-item[data-route]');
    if (!btn) return;
    const route = btn.getAttribute('data-route');
    if (route) window.Router.navigate('#' + route);
    updateNav(route || window.Router.getCurrentRoute().name);
  });

  // Sécurité absolue : splash caché après 2s max quoi qu'il arrive
  const safetyTimer = setTimeout(() => {
    console.warn('Safety timer déclenché');
    hideSplash();
  }, 2000);

  try {
    // Initialise le state, le router, les routes
    initAppCore();

    // Initialise les modules gamification (abonnements badges)
    if (window.Gamification && window.Gamification.init) window.Gamification.init();

    // Lance le splash avec délai normal
    setTimeout(() => {
      clearTimeout(safetyTimer);
      hideSplash();
    }, SPLASH_DURATION_MS);
  } catch (e) {
    console.error('Erreur init:', e);
    clearTimeout(safetyTimer);
    hideSplash(); // Lance quand même l'app même si erreur
  }
});
