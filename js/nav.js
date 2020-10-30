/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
document.addEventListener('DOMContentLoaded', () => {
  // function untuk load page berdasarkan navigasi
  function loadPage(page) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const content = document.querySelector('#body-content');
        if (xhr.status === 200) {
          content.innerHTML = xhr.responseText;
        } else if (xhr.status === 404) {
          content.innerHTML = '<p>Halaman tidak ditemukan.</p>';
        } else {
          content.innerHTML = '<p>Ups.. halaman tidak dapat diakses.</p>';
        }
      }
    };
    xhr.open('GET', `pages/${page}.html`, true);
    xhr.send();
  }

  // deklarasi nilai awal variable
  let page = window.location.hash.substr(1);
  if (page === '') page = 'home';
  loadPage(page);

  // Fungsi untuk top navbar
  function topNav() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Muat daftar tautan menu
          document.querySelectorAll('.topnav').forEach((elm) => {
            elm.innerHTML = xhr.responseText;
          });

          // initialize mataerialize
          const dropdown = document.querySelector('.dropdown-trigger');
          M.Dropdown.init(dropdown);

          // register event listener for every menu on topnav
          document.querySelectorAll('.topnav .link').forEach((elm) => {
            elm.addEventListener('click', (event) => {
              // load content
              page = event.target.getAttribute('href').substr(1);
              loadPage(page);
            });
          });
        }
      }
    };
    xhr.open('GET', '/pages/nav.html', true);
    xhr.send();
  }

  // fungsi untuk side navbar
  function sideNav() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Muat daftar tautan menu
          document.querySelectorAll('.sidenav').forEach((elm) => {
            elm.innerHTML = xhr.responseText;
          });

          // initialize mataerialize
          const sidenav = document.querySelector('.sidenav');
          M.Sidenav.init(sidenav);
          const dropdown = document.querySelector('.dropdown-trigger');
          M.Dropdown.init(dropdown);

          // register event listener for every menu on topnav
          document.querySelectorAll('.sidenav .link').forEach((elm) => {
            elm.addEventListener('click', (event) => {
              // close sidenav
              M.Sidenav.getInstance(sidenav).close();

              // load content and close sidenav
              page = event.target.getAttribute('href').substr(1);
              loadPage(page);
            });
          });
        }
      }
    };
    xhr.open('GET', '/pages/nav.html', true);
    xhr.send();
  }
  topNav();
  sideNav();
});
