/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
document.addEventListener('DOMContentLoaded', () => {
  // Fungsi untuk top navbar
  function topNav() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (this.readyState === 4) {
        if (this.status !== 200) {
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
        if (this.status !== 200) {
          const elems = document.querySelectorAll('.sidenav');
          M.Sidenav.init(elems);
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
      }
    };
    xhr.open('GET', '/pages/nav.html', true);
    xhr.send();
  }
  topNav();
  sideNav();
});
