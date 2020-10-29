/* eslint-disable no-console */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/js/sw.js')
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
