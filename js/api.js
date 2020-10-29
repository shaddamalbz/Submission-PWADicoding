/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const baseURL = 'https://api.football-data.org/v2';
const tokenAPI = '544f016a821c444c94939faab4d0a737';

const endpointIng = `${baseURL}competitions/2021/standings`;
const endpointJer = `${baseURL}competitions/2002/standings`;
const endpointSpn = `${baseURL}competitions/2014/standings`;
const endPointPrc = `${baseURL}competitions/2015/standings`;

// fungsi fetch
const fetchAPI = (url) => {
  fetch(url, {
    headers: {
      'X-Auth-Token': tokenAPI,
    },
  })
    .then((res) => {
      if (res.status !== 200) {
        console.log(`Error : ${res.status}`);
        return Promise.reject(new Error(res.statusText));
      }
      return Promise.resolve(res);
    })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};

// semua fungsi untuk menampilkan content atau apapun namanya
function showStanding(data) {
  let standings = '';
  const standingElement = document.getElementById('body-content');
}

// semua fungsi untuk mengambil data dari API
function getStandingIng() {

}
function getStandingJer() {

}
function getStandingSpn() {

}
function getStandingPrc() {

}
