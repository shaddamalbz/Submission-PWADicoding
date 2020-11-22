/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if (workbox) console.log('Workbox berhasil dimuat');
else console.log('Workbox gagal dimuat');

workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: '1' },
  { url: '/manifest.json', revision: '1' },
  { url: '/pages/home.html', revision: '1' },
  { url: '/pages/nav.html', revision: '1' },
  { url: '/pages/about.html', revision: '1' },
  { url: '/pages/standings.html', revision: '1' },
  { url: '/pages/teams.html', revision: '1' },
  { url: '/pages/saved.html', revision: '1' },
  { url: '/img/goal.svg', revision: '1' },
  { url: '/img/Paspoto-square.png', revision: '1' },
  { url: '/img/football-512.png', revision: '1' },
  { url: '/img/football-512-maskable.png', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/css/style.css', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: '/js/nav.js', revision: '1' },
  { url: '/js/show.js', revision: '1' },
  { url: '/js/api.js', revision: '1' },
  { url: '/js/db.js', revision: '1' },
  { url: '/js/idb.js', revision: '1' },
  { url: '/js/sw-regis.js', revision: '1' },
  { url: '/js/notifikasi.js', revision: '1' },
  { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
  { url: 'https://use.fontawesome.com/releases/v5.15.1/css/all.css', revision: '1' },
]);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst(),
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  }),
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.networkFirst({
    cacheName: 'API Football',
  }),
);

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
