/* eslint-disable no-restricted-globals */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

// Save Team
async function saveTeam(data) {
  const button = document.getElementById('save');
  if (await Db.getTeam(data.id)) {
    button.innerHTML = 'delete';
  } else {
    button.innerHTML = 'add';
  }

  button.addEventListener('click', async () => {
    const exist = await Db.getTeam(data.id);

    if (exist) {
      Db.deleteTeam(data.id);
      M.toast({ html: `${data.name} dihapus dari favorit` });
    } else {
      Db.addTeam(data);
      M.toast({ html: `${data.name} Berhasil menambahkan tim ini ke favorit` });
    }
  });
}

function showStanding(data) {
  let standings = '';
  const standingElm = document.getElementById('standings');

  // looping data standings
  data.standings[0].table.forEach((standing) => {
    standings += `
      <table class="z-depth-1 rounded">
        <tr class="teams">
          <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="Logo Tim"/></td>
          <td><a class="linked" href="#team?id=${standing.team.id}">${standing.team.name}</a><p>${standing.won} <span class="green-text">Win</span></p><p>${standing.draw} <span class="grey-text">Draw</span></p><p>${standing.lost} <span class="red-text">Lose</span></p></td>
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
    <div class="col s6 text-center sub-title">
      <h7 class="white-text">${data.season.startDate} - ${data.season.endDate}</h7>
    </div>
    <div class="col s6 text-center">
      <h7 class="white-text">${data.competition.area.name}</h7>
    </div>
  </div>
  ${standings}
  `;
}

function showTeam(team) {
  let playerElm = '';
  const teamsElm = document.getElementById('teams-detail');

  team.squad.forEach((player) => {
    playerElm += `
      <div class="z-depth-1 row rounded player-list">
        <h4>${player.name}</h4>
        <p>${player.role}</p>
        <h6>Positition : ${player.position}</h6>
      </div>
    `;
  });

  teamsElm.innerHTML = `
  <div class="row rounded title grey darken-4">
    <div class="col s12 text-center teams-logo">
      <img class="team-logo" alt="logo team" src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}"/>
    </div>
    <div class="col s12">
      <h3 class="text-center white-text">${team.name}</h3>
    </div>
    <div class="fixed-action-btn">
      <a class="btn-floating btn-large red" id="btn">
        <i class="large material-icons" id="btnChange"></i>
      </a>
    </div>
  </div>
  ${playerElm}
  `;
  saveTeam(team);
}

function showSavedTeam(data) {
  // initial variabel
  let savedTeams = '';
  const savedElm = document.getElementById('teams-saved');

  data.forEach((team) => {
    savedTeams += `
    <table class="z-depth-1 rounded saved">
      <tr class="teams">
        <td><img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="Logo Tim"/></td>
        <td><a class="linked" href="#team?id=${team.id}">${team.name}</a></td>
      </tr>
    </table>
    `;
  });

  savedElm.innerHTML = `
  <div class="row rounded fav grey darken-4">
    <h3 class="text-center white-text">Team Favorit</h3>
  </div>
  ${savedTeams}
  `;
  saveTeam(data);
}
