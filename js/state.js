/**
 * OPJ EXAMEN — Store central (pattern Observer)
 * État unique, computed values, actions, subscribe/dispatch, persistance.
 */

function getStorage() {
  if (!window.Storage) {
    console.error('[AppState] Storage non disponible');
    return {
      get: () => null,
      set: () => false,
      migrate: (data) => data
    };
  }
  return window.Storage;
}

const STATE_KEY = 'opj_examen_state';
const CURRENT_VERSION = 1;

/** Hiérarchie des grades Police Nationale */
const GRADES_CONFIG = [
  { index: 0, name: 'Gardien Élève', corps: 'CEA', xpMin: 0, xpMax: 500, color: '#8B7355', tier: 'bronze' },
  { index: 1, name: 'Gardien Stagiaire', corps: 'CEA', xpMin: 500, xpMax: 1500, color: '#A0845C', tier: 'bronze' },
  { index: 2, name: 'Gardien de la Paix', corps: 'CEA', xpMin: 1500, xpMax: 4000, color: '#C0C0C0', tier: 'argent' },
  { index: 3, name: 'Brigadier-Chef', corps: 'CEA', xpMin: 4000, xpMax: 8000, color: '#D4D4D4', tier: 'argent' },
  { index: 4, name: 'Major de Police', corps: 'CEA', xpMin: 8000, xpMax: 15000, color: '#FFD700', tier: 'or' },
  { index: 5, name: 'Lieutenant', corps: 'CC', xpMin: 15000, xpMax: 25000, color: '#FFD700', tier: 'or' },
  { index: 6, name: 'Capitaine', corps: 'CC', xpMin: 25000, xpMax: 40000, color: '#E5E4E2', tier: 'platine' },
  { index: 7, name: 'Commandant', corps: 'CC', xpMin: 40000, xpMax: 60000, color: '#E5E4E2', tier: 'platine' },
  { index: 8, name: 'Commissaire', corps: 'CCD', xpMin: 60000, xpMax: 90000, color: '#B9F2FF', tier: 'diamant' },
  { index: 9, name: 'OPJ Expert 👑', corps: 'CCD', xpMin: 90000, xpMax: Infinity, color: '#F5A623', tier: 'legendaire' }
];

const DEFAULT_STATE = {
  _version: CURRENT_VERSION,

  user: {
    id: null,
    name: '',
    corps: null,
    examDate: null,
    dailyGoal: 15,
    onboardingDone: false,
    createdAt: null,
    lastSessionAt: null
  },

  progress: {
    ep1: {
      dpg: { answered: 0, correct: 0, sessions: [] },
      dps: { answered: 0, correct: 0, sessions: [] }
    },
    ep2: {
      pp: { answered: 0, correct: 0, sessions: [] }
    },
    ep3: {
      simulations: []
    },
    lessons: {
      completed: [],
      lastRead: null
    },
    cartouches: {
      learned: [],
      built: []
    },
    infractions: {
      sm2: {}
    },
    casePratiques: {
      submitted: []
    }
  },

  gamification: {
    xp: 0,
    gradeIndex: 0,
    streak: 0,
    lastStreakDate: null,
    streakFreezes: 0,
    badges: [],
    weeklyXP: 0,
    weekStart: null,
    monthlyXP: 0,
    monthStart: null,
    comboCount: 0,
    totalSessions: 0
  },

  pro: {
    isActive: false,
    plan: null,
    startedAt: null,
    expiresAt: null,
    trialUsed: false,
    trialStartedAt: null
  },

  settings: {
    sound: true,
    notifications: false,
    notifTime: '08:00',
    permissionAsked: false
  }
};

/** Abonnements par clé : Set<callback> */
const subscribers = new Map();

/**
 * Calcule la moyenne des 10 dernières sessions d'une épreuve (sur 20).
 * @param {object} state - État complet
 * @param {string} epreuve - 'ep1' | 'ep2' | 'ep3'
 * @returns {number|null} Note /20 ou null si < 5 sessions
 */
function predictedScore(state, epreuve) {
  let sessions = [];
  if (epreuve === 'ep1') {
    sessions = [
      ...(state.progress.ep1.dpg.sessions || []),
      ...(state.progress.ep1.dps.sessions || [])
    ];
  } else if (epreuve === 'ep2') {
    sessions = state.progress.ep2.pp.sessions || [];
  } else if (epreuve === 'ep3') {
    sessions = state.progress.ep3.simulations || [];
  }
  sessions = sessions
    .map(s => (s.score != null ? s.score : (s.correct / Math.max(1, s.total)) * 20))
    .filter(n => typeof n === 'number');
  const last10 = sessions.slice(-10);
  if (last10.length < 5) return null;
  const sum = last10.reduce((a, b) => a + b, 0);
  return Math.round((sum / last10.length) * 10) / 10;
}

/**
 * Score total prévu (PN/GN) : ep1×2 + ep2×3 + ep3×1, max 120.
 * @param {object} state
 * @returns {number|null}
 */
function totalPredictedScore(state) {
  const ep1 = predictedScore(state, 'ep1');
  const ep2 = predictedScore(state, 'ep2');
  const ep3 = predictedScore(state, 'ep3');
  if (ep1 == null || ep2 == null || ep3 == null) return null;
  return ep1 * 2 + ep2 * 3 + ep3 * 1;
}

/**
 * Début de la semaine courante (lundi) en ISO date string.
 * @returns {string}
 */
function getWeekStart() {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - (day === 0 ? 6 : day - 1);
  const monday = new Date(d);
  monday.setDate(diff);
  monday.setHours(0, 0, 0, 0);
  return monday.toISOString().slice(0, 10);
}

/**
 * Nombre de questions répondues depuis le début de la semaine.
 * @param {object} state
 * @returns {number}
 */
function weeklyQuestionsAnswered(state) {
  const weekStart = state.gamification.weekStart || getWeekStart();
  let total = 0;
  const add = (sessions) => {
    if (!Array.isArray(sessions)) return;
    sessions.forEach(s => {
      const date = s.date || s.submittedAt;
      if (date && date.slice(0, 10) >= weekStart) total += s.total || 0;
    });
  };
  add(state.progress.ep1.dpg.sessions);
  add(state.progress.ep1.dps.sessions);
  add(state.progress.ep2.pp.sessions);
  add(state.progress.ep3.simulations);
  return total;
}

/** État en mémoire */
let state = JSON.parse(JSON.stringify(DEFAULT_STATE));

/**
 * S'abonner aux changements d'une clé (ou de tout l'état).
 * @param {string} key - Clé (ex: 'user', 'progress', 'gamification') ou '*' pour tout
 * @param {function(object): void} callback
 */
function subscribe(key, callback) {
  if (!subscribers.has(key)) subscribers.set(key, new Set());
  subscribers.get(key).add(callback);
}

/**
 * Se désabonner (même référence callback).
 * @param {string} key
 * @param {function} callback
 */
function unsubscribe(key, callback) {
  const set = subscribers.get(key);
  if (set) set.delete(callback);
}

/**
 * Notifie les abonnés d'une clé et de '*' après modification.
 * @param {string} key
 */
function notify(key) {
  const payload = key === '*' ? state : getState(key);
  [key, '*'].forEach(k => {
    subscribers.get(k)?.forEach(cb => {
      try { cb(payload); } catch (e) { console.warn('[AppState] subscriber error', e); }
    });
  });
}

/**
 * Dispatch une action et met à jour l'état.
 * @param {string} action - Type d'action
 * @param {object} payload - Données de l'action
 */
function dispatch(action, payload = {}) {
  let modifiedKey = '*';

  switch (action) {
    case 'INIT_USER': {
      state.user = { ...DEFAULT_STATE.user, ...payload, _version: undefined };
      if (!state.user.id) state.user.id = crypto.randomUUID?.() || `id-${Date.now()}`;
      if (!state.user.createdAt) state.user.createdAt = new Date().toISOString();
      modifiedKey = 'user';
      break;
    }
    case 'UPDATE_USER': {
      state.user = { ...state.user, ...payload };
      modifiedKey = 'user';
      break;
    }
    case 'RECORD_SESSION_RESULT': {
      const { epreuve, part, correct, total, score } = payload;
      const session = { correct, total, score: score ?? (total ? (correct / total) * 20 : 0), date: new Date().toISOString() };
      if (epreuve === 'ep1' && (part === 'dpg' || part === 'dps')) {
        state.progress.ep1[part].answered += total;
        state.progress.ep1[part].correct += correct;
        state.progress.ep1[part].sessions = (state.progress.ep1[part].sessions || []).concat(session).slice(-50);
      } else if (epreuve === 'ep2' && part === 'pp') {
        state.progress.ep2.pp.answered += total;
        state.progress.ep2.pp.correct += correct;
        state.progress.ep2.pp.sessions = (state.progress.ep2.pp.sessions || []).concat(session).slice(-50);
      } else if (epreuve === 'ep3') {
        state.progress.ep3.simulations = (state.progress.ep3.simulations || []).concat(session).slice(-50);
      }
      state.user.lastSessionAt = new Date().toISOString();
      state.gamification.totalSessions = (state.gamification.totalSessions || 0) + 1;
      modifiedKey = 'progress';
      break;
    }
    case 'COMPLETE_LESSON': {
      const id = payload.id ?? payload;
      if (!state.progress.lessons.completed.includes(id)) {
        state.progress.lessons.completed.push(id);
      }
      state.progress.lessons.lastRead = id;
      modifiedKey = 'progress';
      break;
    }
    case 'ADD_XP': {
      const amount = payload.amount ?? payload ?? 0;
      state.gamification.xp = (state.gamification.xp || 0) + amount;
      state.gamification.weeklyXP = (state.gamification.weeklyXP || 0) + amount;
      state.gamification.monthlyXP = (state.gamification.monthlyXP || 0) + amount;
      const weekStart = getWeekStart();
      if (state.gamification.weekStart !== weekStart) {
        state.gamification.weekStart = weekStart;
        state.gamification.weeklyXP = amount;
      }
      const monthStart = new Date().toISOString().slice(0, 7);
      if (state.gamification.monthStart !== monthStart) {
        state.gamification.monthStart = monthStart;
        state.gamification.monthlyXP = amount;
      }
      while (state.gamification.gradeIndex < GRADES_CONFIG.length - 1 && state.gamification.xp >= GRADES_CONFIG[state.gamification.gradeIndex + 1].xpMin) {
        state.gamification.gradeIndex++;
      }
      modifiedKey = 'gamification';
      break;
    }
    case 'RECORD_COMBO': {
      state.gamification.comboCount = (state.gamification.comboCount || 0) + 1;
      modifiedKey = 'gamification';
      break;
    }
    case 'BREAK_COMBO': {
      state.gamification.comboCount = 0;
      modifiedKey = 'gamification';
      break;
    }
    case 'UNLOCK_BADGE': {
      const id = payload.id ?? payload;
      if (!state.gamification.badges.includes(id)) {
        state.gamification.badges.push(id);
      }
      modifiedKey = 'gamification';
      break;
    }
    case 'INCREMENT_STREAK': {
      const today = new Date().toISOString().slice(0, 10);
      const last = state.gamification.lastStreakDate;
      if (last !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().slice(0, 10);
        state.gamification.streak = (last === yesterdayStr ? state.gamification.streak : 0) + 1;
        state.gamification.lastStreakDate = today;
      }
      modifiedKey = 'gamification';
      break;
    }
    case 'RESET_STREAK': {
      state.gamification.streak = 0;
      state.gamification.lastStreakDate = null;
      modifiedKey = 'gamification';
      break;
    }
    case 'USE_STREAK_FREEZE': {
      state.gamification.streakFreezes = Math.max(0, (state.gamification.streakFreezes || 0) - 1);
      modifiedKey = 'gamification';
      break;
    }
    case 'ACTIVATE_PRO': {
      state.pro = { ...state.pro, isActive: true, plan: payload.plan ?? 'monthly', startedAt: payload.startedAt ?? new Date().toISOString(), expiresAt: payload.expiresAt ?? null, trialUsed: payload.trialUsed ?? state.pro.trialUsed };
      modifiedKey = 'pro';
      break;
    }
    case 'DEACTIVATE_PRO': {
      state.pro = { ...DEFAULT_STATE.pro };
      modifiedKey = 'pro';
      break;
    }
    case 'UPDATE_SM2': {
      state.progress.infractions.sm2 = { ...state.progress.infractions.sm2, ...payload };
      modifiedKey = 'progress';
      break;
    }
    case 'SUBMIT_CAS_PRATIQUE': {
      const entry = { id: payload.id, submittedAt: new Date().toISOString(), text: payload.text };
      state.progress.casePratiques.submitted = (state.progress.casePratiques.submitted || []).concat(entry);
      modifiedKey = 'progress';
      break;
    }
    case 'COMPLETE_CARTOUCHE': {
      const id = payload.id ?? payload;
      if (!state.progress.cartouches.learned.includes(id)) state.progress.cartouches.learned.push(id);
      if (payload.built && !state.progress.cartouches.built.includes(id)) state.progress.cartouches.built.push(id);
      modifiedKey = 'progress';
      break;
    }
    case 'UPDATE_SETTINGS': {
      state.settings = { ...state.settings, ...payload };
      modifiedKey = 'settings';
      break;
    }
    case 'RESET_ALL': {
      state = JSON.parse(JSON.stringify(DEFAULT_STATE));
      state._version = CURRENT_VERSION;
      modifiedKey = '*';
      break;
    }
    default:
      console.warn('[AppState] unknown action', action);
      return;
  }

  state._version = CURRENT_VERSION;
  save();
  notify(modifiedKey);
}

/**
 * Lit l'état (complet ou une clé).
 * @param {string} [key] - Clé optionnelle
 * @returns {object}
 */
function getState(key) {
  if (!key) return state;
  const keys = key.split('.');
  let v = state;
  for (const k of keys) {
    v = v?.[k];
  }
  return v;
}

/** Computed: note prévue /20 pour une épreuve */
function getPredictedScore(epreuve) {
  return predictedScore(state, epreuve);
}

/** Computed: score total prévu (max 120) */
function getTotalPredictedScore() {
  return totalPredictedScore(state);
}

/** Computed: true si note éliminatoire (≤5) */
function isEpreuveEliminable(epreuve) {
  const score = predictedScore(state, epreuve);
  return score !== null && score <= 5;
}

/** Computed: true si zone danger (<7) */
function isDangerZone(epreuve) {
  const score = predictedScore(state, epreuve);
  return score !== null && score < 7;
}

/**
 * Jours restants jusqu'à la date d'examen.
 * @returns {number|null}
 */
function daysUntilExam() {
  const date = state.user.examDate;
  if (!date) return null;
  try {
    const exam = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    exam.setHours(0, 0, 0, 0);
    const diff = Math.floor((exam - today) / (24 * 60 * 60 * 1000));
    return diff;
  } catch (e) {
    return null;
  }
}

/** Grade actuel (objet complet) */
function currentGrade() {
  const idx = Math.min(state.gamification.gradeIndex ?? 0, GRADES_CONFIG.length - 1);
  return GRADES_CONFIG[idx];
}

/** XP restants pour le prochain grade */
function xpToNextGrade() {
  const g = currentGrade();
  const next = GRADES_CONFIG[state.gamification.gradeIndex + 1];
  if (!next) return null;
  return Math.max(0, next.xpMin - state.gamification.xp);
}

/** Questions répondues cette semaine */
function getWeeklyQuestionsAnswered() {
  return weeklyQuestionsAnswered(state);
}

/**
 * Persiste l'état dans localStorage.
 */
function save() {
  getStorage().set(state, STATE_KEY);
}

/**
 * Charge l'état depuis localStorage et applique la migration si besoin.
 */
function load() {
  const raw = getStorage().get(STATE_KEY);
  if (!raw || typeof raw !== 'object') {
    state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    state._version = CURRENT_VERSION;
    save();
    return;
  }
  const migrated = getStorage().migrate(raw, CURRENT_VERSION, (data) => {
    const next = { ...DEFAULT_STATE, ...data };
    next._version = CURRENT_VERSION;
    return next;
  });
  state = migrated;
  save();
}
window.AppState = {
  GRADES_CONFIG,
  DEFAULT_STATE,
  subscribe,
  unsubscribe,
  dispatch,
  getState,
  getPredictedScore,
  getTotalPredictedScore,
  isEpreuveEliminable,
  isDangerZone,
  daysUntilExam,
  currentGrade,
  xpToNextGrade,
  getWeeklyQuestionsAnswered,
  save,
  load
};
