/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-console */
const baseURL = 'https://api.football-data.org/v2/';
const tokenAPI = '536067bb74844b139964b048eba3cb6c';

const endpointIng = `${baseURL}competitions/2021/standings`;
const endpointJer = `${baseURL}competitions/2002/standings`;
const endpointSpn = `${baseURL}competitions/2014/standings`;
const endPointPrc = `${baseURL}competitions/2015/standings`;

function status(response) {
  if (response.status !== 200) {
    console.log(`Error : ${response.status}`);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  }
  // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
  return Promise.resolve(response);
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log(`Error : ${error}`);
}

function getStandingIng() {
  if ('caches' in window) {
    caches.match(endpointIng).then((response) => {
      if (response) {
        response.json().then((data) => {
          console.log(`Competition Data: ${data}`);
          showStanding(data);
        });
      }
    });
  }
  fetch(endpointIng, {
    headers: {
      'X-Auth-Token': tokenAPI,
    },
  })
    .then(status)
    .then(json)
    .then((data) => {
      showStanding(data);
    })
    .catch(error);
}

function getStandingJer() {
  if ('caches' in window) {
    caches.match(endpointJer).then((response) => {
      if (response) {
        response.json().then((data) => {
          console.log(`Competition Data: ${data}`);
          showStanding(data);
        });
      }
    });
  }
  fetch(endpointJer, {
    headers: {
      'X-Auth-Token': tokenAPI,
    },
  })
    .then(status)
    .then(json)
    .then((data) => {
      showStanding(data);
    })
    .catch(error);
}

function getStandingSpn() {
  if ('caches' in window) {
    caches.match(endpointSpn).then((response) => {
      if (response) {
        response.json().then((data) => {
          console.log(`Competition Data: ${data}`);
          showStanding(data);
        });
      }
    });
  }
  fetch(endpointSpn, {
    headers: {
      'X-Auth-Token': tokenAPI,
    },
  })
    .then(status)
    .then(json)
    .then((data) => {
      showStanding(data);
    })
    .catch(error);
}

function getStandingPrc() {
  if ('caches' in window) {
    caches.match(endPointPrc).then((response) => {
      if (response) {
        response.json().then((data) => {
          console.log(`Competition Data: ${data}`);
          showStanding(data);
        });
      }
    });
  }
  fetch(endPointPrc, {
    headers: {
      'X-Auth-Token': tokenAPI,
    },
  })
    .then(status)
    .then(json)
    .then((data) => {
      showStanding(data);
    })
    .catch(error);
}

function getTeamsByID() {
  return new Promise((resolve, reject) => {
    // Ambil nilai query parameter (?id=)
    const urlParams = new URL(window.location.href.replace('#team', ''));
    const idParam = urlParams.searchParams.get('id');
    if ('caches' in window) {
      caches.match(`${baseURL}teams/${idParam}`).then((response) => {
        if (response) {
          response.json().then((data) => {
            showTeam(data);
          });
        }
      });
    }
    fetch(`${baseURL}teams/${idParam}`, {
      headers: {
        'X-Auth-Token': tokenAPI,
      },
    })
      .then(status)
      .then(json)
      .then((data) => {
        showTeam(data);
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

function getSavedTeams() {
  Db.getAllTeams()
    .then((data) => {
      showSavedTeam(data);
    });
}
