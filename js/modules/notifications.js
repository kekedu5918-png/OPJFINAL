/**
 * OPJ EXAMEN — Notifications PWA
 * Permission demandée après la 2e session complète. 6 types de notifications.
 * VAPID : voir instructions en bas du fichier.
 */
 
const PERMISSION_AFTER_SESSIONS = 2;

/** Types de notifications (pour le serveur push ou local) */
const NOTIF_TYPES = {
  DAILY_REMINDER: 'daily_reminder',
  CARDS_DUE: 'cards_due',
  DANGER_ELIMINATING: 'danger_eliminating',
  J30_EXAM: 'j30_exam',
  J7_EXAM: 'j7_exam',
  STREAK_AT_RISK: 'streak_at_risk'
};

/**
 * Vérifie si on doit demander la permission (2e session complétée, pas encore demandée).
 */
function shouldAskPermission() {
  const totalSessions = (window.AppState.getState('gamification') || {}).totalSessions || 0;
  const settings = window.AppState.getState('settings') || {};
  if (totalSessions < PERMISSION_AFTER_SESSIONS) return false;
  if (settings.permissionAsked) return false;
  return true;
}

/**
 * Demande la permission de notification et enregistre le choix.
 * @returns {Promise<'granted'|'denied'|'default'>}
 */
async function askPermission() {
  if (!('Notification' in window)) return 'denied';
  const permission = await Notification.requestPermission();
  window.AppState.dispatch('UPDATE_SETTINGS', { permissionAsked: true });
  if (permission === 'granted') {
    window.AppState.dispatch('UPDATE_SETTINGS', { notifications: true });
  }
  return permission;
}

/**
 * Vérifie si les notifications sont activées (paramètre utilisateur + permission).
 */
function areNotificationsEnabled() {
  const settings = window.AppState.getState('settings') || {};
  if (!settings.notifications) return false;
  if (!('Notification' in window)) return false;
  return Notification.permission === 'granted';
}

/**
 * Construit le contenu des 6 types de notifications (pour affichage local ou push).
 */
function getNotificationContent(type, data = {}) {
  const streak = (window.AppState.getState('gamification') || {}).streak || 0;
  const dailyGoal = (window.AppState.getState('user') || {}).dailyGoal || 15;
  const examDate = (window.AppState.getState('user') || {}).examDate || null;
  const sm2 = window.AppState.getState('progress.infractions.sm2') || {};
  const today = new Date().toISOString().slice(0, 10);
  const dueCount = Object.values(sm2).filter((v) => v && v.due === today).length;

  const scores = {
    ep1: window.AppState.getPredictedScore?.('ep1'),
    ep2: window.AppState.getPredictedScore?.('ep2'),
    ep3: window.AppState.getPredictedScore?.('ep3')
  };
  const dangerEpreuve = [['ep1', scores.ep1], ['ep2', scores.ep2], ['ep3', scores.ep3]]
    .find(([, s]) => s != null && s <= 5);
  const epLabel = dangerEpreuve ? (dangerEpreuve[0] === 'ep1' ? '1' : dangerEpreuve[0] === 'ep2' ? '2' : '3') : null;

  switch (type) {
    case NOTIF_TYPES.DAILY_REMINDER:
      return {
        title: 'OPJ Examen',
        body: `🔥 Ta série de ${streak} jours continue. ${dailyGoal} questions t'attendent.`,
        tag: NOTIF_TYPES.DAILY_REMINDER
      };
    case NOTIF_TYPES.CARDS_DUE:
      return {
        title: 'OPJ Examen',
        body: `🧠 ${dueCount} carte${dueCount > 1 ? 's' : ''} à revoir aujourd'hui.`,
        tag: NOTIF_TYPES.CARDS_DUE
      };
    case NOTIF_TYPES.DANGER_ELIMINATING:
      return {
        title: 'OPJ Examen',
        body: `⚠️ Épreuve ${epLabel || 'X'} à risque. Révise maintenant.`,
        tag: NOTIF_TYPES.DANGER_ELIMINATING
      };
    case NOTIF_TYPES.J30_EXAM:
      return {
        title: 'OPJ Examen',
        body: '📅 Il reste 30 jours. Plan intensif activé.',
        tag: NOTIF_TYPES.J30_EXAM
      };
    case NOTIF_TYPES.J7_EXAM:
      return {
        title: 'OPJ Examen',
        body: '🚨 7 jours. Focus sur tes 2 points les plus faibles.',
        tag: NOTIF_TYPES.J7_EXAM
      };
    case NOTIF_TYPES.STREAK_AT_RISK:
      return {
        title: 'OPJ Examen',
        body: `🔥 Ta série de ${streak} jours est en danger !`,
        tag: NOTIF_TYPES.STREAK_AT_RISK
      };
    default:
      return { title: 'OPJ Examen', body: '', tag: 'opj-default' };
  }
}

/**
 * Affiche une notification locale (sans push serveur).
 * À appeler depuis l'app quand les conditions sont remplies (ex: après check périodique).
 */
async function showLocalNotification(type) {
  if (!areNotificationsEnabled()) return;
  const reg = await getRegistration();
  if (!reg || !reg.showNotification) return;
  const content = getNotificationContent(type);
  await reg.showNotification(content.title, {
    body: content.body,
    tag: content.tag,
    icon: './assets/icons/icon-192.png',
    badge: './assets/icons/icon-192.png',
    data: { url: './app.html', type }
  });
}

async function getRegistration() {
  if (!('serviceWorker' in navigator)) return null;
  return navigator.serviceWorker.ready;
}

/**
 * À appeler après une session complétée : demande la permission si 2e session.
 */
async function maybeAskPermissionAfterSession() {
  if (!shouldAskPermission()) return null;
  return askPermission();
}

/**
 * Vérifie les conditions pour chaque type et renvoie les types à envoyer maintenant.
 * À appeler par un job (ex: toutes les heures ou au réveil de l'app).
 */
function getNotificationsToSendNow() {
  const toSend = [];
  const settings = window.AppState.getState('settings') || {};
  const notifTime = (settings.notifTime || '08:00').split(':');
  const hour = parseInt(notifTime[0], 10);
  const minute = parseInt(notifTime[1], 10) || 0;
  const now = new Date();
  const user = window.AppState.getState('user') || {};
  const examDate = user.examDate ? new Date(user.examDate) : null;

  if (examDate) {
    const daysLeft = Math.ceil((examDate - now) / (24 * 60 * 60 * 1000));
    if (daysLeft === 30) toSend.push(NOTIF_TYPES.J30_EXAM);
    if (daysLeft === 7) toSend.push(NOTIF_TYPES.J7_EXAM);
  }

  const gamification = window.AppState.getState('gamification') || {};
  const streak = gamification.streak || 0;
  const lastStreakDate = gamification.lastStreakDate;
  const today = now.toISOString().slice(0, 10);
  if (streak > 0 && lastStreakDate !== today && now.getHours() >= 22) {
    toSend.push(NOTIF_TYPES.STREAK_AT_RISK);
  }

  const scores = [
    ['ep1', window.AppState.getPredictedScore?.('ep1')],
    ['ep2', window.AppState.getPredictedScore?.('ep2')],
    ['ep3', window.AppState.getPredictedScore?.('ep3')]
  ];
  if (scores.some(([, s]) => s != null && s <= 5)) {
    toSend.push(NOTIF_TYPES.DANGER_ELIMINATING);
  }

  const sm2 = window.AppState.getState('progress.infractions.sm2') || {};
  const dueToday = Object.values(sm2).filter((v) => v && v.due === today).length;
  if (dueToday > 0 && now.getHours() >= hour && now.getMinutes() >= minute) {
    toSend.push(NOTIF_TYPES.CARDS_DUE);
  }

  if (now.getHours() === hour && now.getMinutes() >= minute && now.getMinutes() < minute + 15) {
    toSend.push(NOTIF_TYPES.DAILY_REMINDER);
  }

  return toSend;
}

/**
 * Enregistre le SW pour les push (subscription).
 * À appeler après permission granted. Nécessite des clés VAPID côté serveur.
 */
async function subscribeToPush() {
  const reg = await getRegistration();
  if (!reg || !reg.pushManager) return null;
  const key = getVapidPublicKey();
  if (!key) return null;
  try {
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(key)
    });
    return sub.toJSON();
  } catch (e) {
    console.warn('[Notifications] push subscribe failed', e);
    return null;
  }
}

function getVapidPublicKey() {
  return window.OPJ_VAPID_PUBLIC_KEY || '';
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const output = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) output[i] = rawData.charCodeAt(i);
  return output;
}

function init() {
  // L'app peut appeler maybeAskPermissionAfterSession() après chaque session enregistrée.
}
window.Notifications = {
  NOTIF_TYPES,
  shouldAskPermission,
  askPermission,
  areNotificationsEnabled,
  getNotificationContent,
  showLocalNotification,
  maybeAskPermissionAfterSession,
  getNotificationsToSendNow,
  subscribeToPush,
  init
};

/*
 ─── INSTRUCTIONS VAPID (web-push) ───

 1. Générer une paire de clés VAPID (une seule fois) :

    npm install -g web-push
    web-push generate-vapid-keys

    Vous obtiendrez :
      Public Key:  BNx...
      Private Key: yz...

 2. Côté client (cette app) :
    - Exposer la clé publique : window.OPJ_VAPID_PUBLIC_KEY = 'BNx...'
      (par ex. dans app.html via une variable globale ou un config.json)
    - Après Notification.requestPermission() === 'granted', appeler subscribeToPush()
      et envoyer la subscription (sub.toJSON()) à votre backend.

 3. Côté serveur (Node.js exemple avec web-push) :

    const webpush = require('web-push');
    webpush.setVapidDetails(
      'mailto:votre@email.com',
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );

    await webpush.sendNotification(
      subscription, // objet reçu du client
      JSON.stringify({
        title: 'OPJ Examen',
        body: '🔥 Ta série de 5 jours continue. 15 questions t\'attendent.',
        tag: 'daily_reminder',
        data: { url: './app.html' }
      })
    );

 4. Déclencher les envois selon la logique des 6 types :
    - Rappel quotidien : cron à l'heure settings.notifTime
    - Cartes à réviser : cron matin ou selon dueCount
    - Danger éliminatoire : après une session si score prévu ≤ 5
    - J-30 / J-7 : cron quotidien, comparer examDate
    - Streak en danger : cron 22h si pas de session du jour
*/
