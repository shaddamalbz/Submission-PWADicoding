/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const baseURL = 'https://api.football-data.org/v2/';
const tokenAPI = '544f016a821c444c94939faab4d0a737';

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

// semua fungsi untuk menampilkan content atau apapun namanya
function showStanding(data) {
  let standings = '';
  const standingElm = document.getElementById('standings');

  // looping data standings
  data.standings[0].table.forEach((standing) => {
    standings += `
      <table class="z-depth-1 rounded">
        <tr class="teams">
          <td><img class="team-logo" src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="Logo Tim"/></td>
          <td><a class="linked" href="#">${standing.team.name}</a> <br> <p>${standing.won} <span class="green-text">Win</span></p><p>${standing.draw} <span class="grey-text">Draw</span></p><p>${standing.lost} <span class="red-text">Lose</span></p></td>
          <td>Poin :<strong> ${standing.points}</strong> <br>Posisi ke- <strong> ${standing.position} </strong></td>
        </tr>
      </table>
    `;
  });

  standingElm.innerHTML = `
  <div class="row rounded title grey darken-4">
    <div class="col s12">
      <h3 class="text-center white-text">${data.competition.name}</h3>
    </div>
    <div class="col s6 text-center">
      <h7 class="white-text">Time : ${data.season.startDate} - ${data.season.endDate}</h7>
    </div>
    <div class="col s6 text-center">
      <h7 class="white-text">Area : ${data.competition.area.name}</h7>
    </div>
  </div>
  ${standings}
  `;
}

function showTeam(data) {

}

function getStandingIng() {
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
