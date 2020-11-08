/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'LigaBola_v2';
const urlsToCache = [
  '/index.htmlindex.html',
  '/manifest.json',
  '/pages/home.html',
  '/pages/nav.html',
  '/pages/about.html',
  '/pages/standings.html',
  '/pages/teams.html',
  '/pages/saved.html',
  '/img/goal.svg',
  '/img/Paspoto-square.png',
  '/css/materialize.min.css',
  '/css/style.css',
  '/js/materialize.min.js',
  '/js/nav.js',
  '/js/show.js',
  '/js/api.js',
  '/js/db.js',
  '/js/idb.js',
  '/js/sw-regis.js',
  'https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJfecg.woff2',
  'https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2',
  'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
  'https://use.fontawesome.com/releases/v5.15.1/css/all.css',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then((response) => {
        if (response) {
          console.log('ServiceWorker: Gunakan aset dari cache: ', response.url);
          return response;
        }
        console.log(
          'ServiceWorker: Memuat aset dari server: ',
          event.request.url,
        );
        return fetch(event.request);
      }),
  );
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
