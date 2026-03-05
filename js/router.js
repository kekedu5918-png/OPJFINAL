/**
 * OPJ EXAMEN — Router SPA (hash)
 * Navigation hash-based, transitions CSS forward/back, history.
 */

const CONTAINER_ID = 'screen-container';
const ROUTES = [
  'onboarding',
  'home',
  'learn',
  'lesson',
  'train',
  'qcm',
  'infractions',
  'cartouches',
  'cas-pratique',
  'compte-rendu',
  'diagnostic',
  'profile',
  'leaderboard',
  'settings',
  'pro'
];

/** Route courante { name, params } */
let current = { name: '', params: {} };

/** Historique des routes pour Router.back() */
const history = [];

/** Handlers de rendu par route : Map<name, (container, params) => void> */
const handlers = new Map();

/** Callbacks appelés après chaque navigation (ex: mise à jour nav bar) */
const afterNavigateCallbacks = new Set();

/**
 * Parse le hash en route + params.
 * @param {string} hash - Ex: #lesson/dpg-1
 * @returns {{ name: string, params: object }}
 */
function parseHash(hash) {
  const raw = (hash || window.location.hash).replace(/^#/, '') || 'home';
  const parts = raw.split('/').filter(Boolean);
  const name = parts[0] || 'home';
  const params = {};
  if (name === 'lesson' && parts[1]) params.id = parts[1];
  if (name === 'cartouches' && parts[1]) {
    params.id = parts[1];
    if (parts[2]) params.mode = parts[2]; // 'learn' | 'build'
  }
  if (name === 'compte-rendu' && parts[1]) {
    params.id = parts[1];
    if (parts[2]) params.phase = parts[2]; // 'briefing' | 'compte-rendu' | 'resultats'
  }
  return { name, params };
}

/**
 * Récupère la route actuelle.
 * @returns {{ name: string, params: object }}
 */
function getCurrentRoute() {
  return { ...current };
}

/**
 * Navigue vers une route.
 * @param {string} route - Ex: '#home', '#lesson/dpg-1'
 * @param {object} options - { replace: boolean, direction: 'forward'|'back' }
 */
function navigate(route, options = {}) {
  const { replace = false, direction } = options;
  const target = parseHash(route);
  const container = document.getElementById(CONTAINER_ID);
  if (!container) return;

  const prevName = current.name;
  const isBack = direction === 'back' || (history.length > 0 && history[history.length - 1]?.name === target.name);

  if (!replace && prevName) {
    if (isBack) history.pop();
    else history.push({ ...current });
  }

  current = target;
  window.location.hash = route.startsWith('#') ? route : `#${route}`;

  /* Transition CSS */
  container.classList.remove('screen-slide-in-left', 'screen-slide-in-right', 'screen-fade-in');
  container.offsetHeight;
  if (direction === 'back') {
    container.classList.add('screen-slide-in-right');
  } else {
    container.classList.add('screen-slide-in-left');
  }

  const handler = handlers.get(current.name) || handlers.get('*');
  if (handler) {
    try {
      handler(container, current.params);
    } catch (e) {
      console.warn('[Router] handler error', current.name, e);
    }
  } else {
    container.innerHTML = `<div class="screen-placeholder"><p>Écran "${current.name}"</p></div>`;
  }
  afterNavigateCallbacks.forEach(cb => { try { cb(current); } catch (e) { console.warn('[Router] afterNavigate error', e); } });
}

/**
 * Retour en arrière (historique).
 */
function back() {
  if (history.length === 0) {
    navigate('#home', { direction: 'back' });
    return;
  }
  const prev = history.pop();
  let route = `#${prev.name}`;
  if (prev.params.id) route += `/${prev.params.id}`;
  if (prev.params.mode) route += `/${prev.params.mode}`;
  if (prev.params.phase) route += `/${prev.params.phase}`;
  navigate(route, { replace: true, direction: 'back' });
}

/**
 * Enregistre un handler pour une route.
 * @param {string} name - Nom de la route ou '*' pour défaut
 * @param {function(HTMLElement, object): void} handler
 */
function register(name, handler) {
  handlers.set(name, handler);
}

/**
 * Initialise le router : écoute hashchange et charge la route initiale.
 */
function init() {
  window.addEventListener('hashchange', () => {
    const { name, params } = parseHash(window.location.hash);
    if (name === current.name && JSON.stringify(params) === JSON.stringify(current.params)) return;
    current = { name, params };
    const container = document.getElementById(CONTAINER_ID);
    if (!container) return;
    const handler = handlers.get(current.name) || handlers.get('*');
    if (handler) {
      try {
        handler(container, current.params);
      } catch (e) {
        console.warn('[Router] handler error', current.name, e);
      }
    } else {
      container.innerHTML = `<div class="screen-placeholder"><p>Écran « ${current.name} »</p></div>`;
    }
    afterNavigateCallbacks.forEach(cb => { try { cb(current); } catch (e) { console.warn('[Router] afterNavigate error', e); } });
  });

  const initial = parseHash(window.location.hash);
  current = initial;
  const container = document.getElementById(CONTAINER_ID);
  if (container) {
    const handler = handlers.get(current.name) || handlers.get('*');
    if (handler) {
      try {
        handler(container, current.params);
      } catch (e) {
        console.warn('[Router] init handler error', e);
      }
    } else {
      container.innerHTML = '';
    }
    afterNavigateCallbacks.forEach(cb => { try { cb(current); } catch (e) { console.warn('[Router] afterNavigate error', e); } });
  }
}

/**
 * Enregistre un callback appelé après chaque navigation.
 * @param {function({ name: string, params: object }): void} callback
 */
function onNavigate(callback) {
  afterNavigateCallbacks.add(callback);
}
window.Router = { getCurrentRoute, navigate, register, init, onNavigate, back };
