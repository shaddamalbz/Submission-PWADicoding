/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'LigaBola_v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/pages/home.html',
  '/pages/nav.html',
  '/pages/about.html',
  '/pages/standings.html',
  '/pages/teams.html',
  '/pages/saved.html',
  '/img/goal.svg',
  '/img/Paspoto-square.png',
  '/img/football-512.png',
  '/img/football-512-maskable.png',
  '/css/materialize.min.css',
  '/css/style.css',
  '/js/materialize.min.js',
  '/js/nav.js',
  '/js/show.js',
  '/js/api.js',
  '/js/db.js',
  '/js/idb.js',
  '/js/sw-regis.js',
  '/js/notifikasi.js',
  'https://use.fontawesome.com/releases/v5.15.1/webfonts/fa-brands-400.woff2',
  'https://use.fontawesome.com/releases/v5.15.1/webfonts/fa-solid-900.woff2',
  '',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
});

self.addEventListener('fetch', (event) => {
  const baseURL = 'https://api.football-data.org/v2/';
  if (event.request.url.indexOf(baseURL) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => fetch(event.request).then((response) => {
        cache.put(event.request.url, response.clone());
        return response;
      })),
    );
  } else {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then((response) => {
          if (response) {
            // memuat dari cache
            return response;
          }
          // memuat dari server
          return fetch(event.request);
        }),
    );
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(`Service Worker: cache ${cacheName} dihapus`);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});

self.addEventListener('push', (event) => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  const options = {
    body,
    icon: '/img/goal.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options),
  );
});
