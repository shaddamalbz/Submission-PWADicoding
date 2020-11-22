/* eslint-disable no-console */
// REGISTER SERVICE WORKER
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => {
        console.log('Register Service Worker Succesful');
      })
      .catch(() => {
        console.log('Register Service Worker Fail');
      });
  });
} else {
  console.log('This browser not support service worker');
}
