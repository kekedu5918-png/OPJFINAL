/**
 * OPJ EXAMEN — Service Worker PWA
 * Cache First (assets statiques), Network First (données), offline fallback.
 */

const CACHE_NAME = 'blocopj-v1';

const STATIC_ASSETS = [
  './app.html',
  './index.html',
  './manifest.json',
  './css/variables.css',
  './css/base.css',
  './css/animations.css',
  './css/components.css',
  './css/screens.css',
  './js/app.js',
  './js/state.js',
  './js/router.js',
  './js/storage.js',
  './js/modules/onboarding.js',
  './js/modules/home.js',
  './js/modules/qcm.js',
  './js/modules/infractions.js',
  './js/modules/cartouches.js',
  './js/modules/compteRendu.js',
  './js/modules/gamification.js',
  './js/modules/paywall.js',
  './js/modules/notifications.js',
  './js/modules/share.js',
  './js/modules/diagnostic.js',
  './js/modules/casePratique.js',
  './js/modules/flashcards.js',
  './js/modules/lessons.js',
  './data/questions-ep1.js',
  './data/questions-ep2.js',
  './data/infractions.js',
  './data/cartouches.js',
  './data/comptes-rendus.js',
  './data/cas-pratiques.js',
  './data/lessons/dpg.js',
  './data/lessons/dps.js',
  './data/lessons/pp.js',
  'https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@500;700&display=swap'
];

/** Préfixes des URLs considérées comme "données" (Network First) */
const DATA_PREFIXES = ['./data/', '/data/'];

function isDataRequest(url) {
  const path = new URL(url, self.location.origin).pathname;
  return DATA_PREFIXES.some((p) => path.includes(p.replace('./', '')));
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW] install cache addAll partial failure', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  const isNav = event.request.mode === 'navigate';

  if (isNav) {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match('./app.html').then((r) => r || caches.match(event.request)))
    );
    return;
  }

  if (isDataRequest(url)) {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((res) => {
        if (res && res.status === 200 && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return res;
      }).catch(() => {
        if (event.request.destination === 'document') return caches.match('./app.html');
        return null;
      });
    })
  );
});

self.addEventListener('push', (event) => {
  if (!event.data) return;
  let payload = { title: 'OPJ Examen', body: '', tag: 'opj-default' };
  try {
    payload = { ...payload, ...event.data.json() };
  } catch (_) {
    payload.body = event.data.text();
  }
  event.waitUntil(
    self.registration.showNotification(payload.title || 'OPJ Examen', {
      body: payload.body,
      tag: payload.tag || 'opj-default',
      icon: './assets/icons/icon-192.png',
      badge: './assets/icons/icon-192.png',
      data: payload.data || {},
      requireInteraction: payload.requireInteraction === true
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || './app.html';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length) {
        clientList[0].focus();
        clientList[0].navigate(url);
      } else if (self.clients.openWindow) {
        self.clients.openWindow(url);
      }
    })
  );
});
