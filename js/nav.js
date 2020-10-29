/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
document.addEventListener('DOMContentLoaded', () => {
  // Fungsi untuk top navbar
  function topNav() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (this.readyState === 4) {
        if (this.status !== 200) return;

        // Muat daftar tautan menu
        document.querySelectorAll('.topnav').innerHTML = xhr.responseText;

        // initialize dropdown
        const dropdown = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(dropdown);

        // register event listener for every menu on topnav
        document.querySelectorAll('.topnav a').forEach((elm) => {
          elm.addEventListener('click', (event) => {
            // load content
            page = event.target.getAttribute('href').substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhr.open('GET', '/pages/nav.html', true);
    xhr.send();
  }

  // fungsi untuk side navbar
  function sideNav() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (this.readyState === 4) {
        if (this.status !== 200) return;

        // Muat daftar tautan menu
        document.querySelectorAll('.sidenav').innerHTML = xhr.responseText;

        // initialize mataerialize
        const sidenav = document.querySelectorAll('.sidenav');
        M.Sidenav.init(sidenav);
        const dropdown = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(dropdown);

        // register event listener for every menu on topnav
        document.querySelectorAll('.topnav a').forEach((elm) => {
          elm.addEventListener('click', (event) => {
            // close sidenav
            M.Sidenav.getInstance(sidenav).close();

            // load content and close sidenav
            page = event.target.getAttribute('href').substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhr.open('GET', '/pages/nav.html', true);
    xhr.send();
  }
  topNav();
  sideNav();
});
