window.onload = () => {

  const btnSign = document.getElementById('btnSign');
  const tournamentCard = document.getElementById('tournamentCard');
  const upcomingTounamentsCard = document.getElementById('upcomingTounamentsCard');
  const myTounamentsCard = document.getElementById('myTounamentsCard');
  const scoreboardCard = document.getElementById('scoreboardCard');

  btnSign.addEventListener('click', (e) => {
    e.preventDefault();

    const token = getCookie('token');

    if (token) {
      btnSign.href = 'http://localhost:5500/frontend/public/views/index.html';
      document.cookie = 'token=;Max-Age=-99999999';
      document.cookie = 'user_id=;Max-Age=-99999999';
      btnSign.innerText = 'Sign in';
    } else {
      location.href = "http://localhost:5500/frontend/public/views/login.html";
    }
  });

  const checkCookie = () => {
    const token = getCookie('token');

    if (token) {
      btnSign.innerText = 'Sign out';
    }
  }

  const getCookie = (cookieName) => {
    let cookie = cookieName + '=';
    let cookieSplit = document.cookie.split(';');
    for (var j = 0; j < cookieSplit.length; j++) {
      let char = cookieSplit[j];
      while (char.charAt(0) == ' ') {
        char = char.substring(1);
      }
      if (char.indexOf(cookie) == 0) {
        return char.substring(cookie.length, char.length);
      }
    }
    return '';
  }

  const populateTournaments = async () => {
    try {
      let res = await fetch('http://localhost:4000/tournaments');

      if (res.status == 200) {
        let response = await res.json();

        response.forEach(tournament => {
          let start = tournament.time.split('T');
          let startDate = start[0];
          let startTime = start[1].slice(0, 8);

          let end = tournament.applicationDeadline.split('T');
          let endDate = end[0];
          let endTime = end[1].slice(0, 8);

          tournamentCard.innerHTML += `<div class="tech-wrapper">
                                        <a href="http://localhost:5500/frontend/public/views/tournamentDetails.html?${tournament.id}" class="tech-item">
                                          <h4><img src="../img/trophy.svg" alt="">${tournament.name} - ${tournament.discipline}</h4>
                                          <p>Max participants: ${tournament.maxParticipants}</p>
                                          <div class="tech-info">
                                            <div>
                                              <i class="fa-solid fa-hourglass-start"></i>
                                              <span><strong>${startTime}</strong></span>
                                              <span><strong>${startDate}</strong></span>
                                            </div>
                                            <div>
                                              <i class="fa-solid fa-hourglass-end"></i>
                                              <span><strong>${endTime}</strong></span>
                                              <span><strong>${endDate}</strong></span>
                                            </div>
                                          </div>
                                        </a>
                                      </div>`
        });
      }

    } catch (err) {
      console.log(err);
    }
  }

  const populateScoreboards = async () => {
    try {
      let res = await fetch('http://localhost:4000/tournaments');

      if (res.status == 200) {
        let response = await res.json();

        response.forEach(tournament => {
          scoreboardCard.innerHTML += `<div class="tech-wrapper">
                                        <a href="http://localhost:5500/frontend/public/views/scoreboardDetails.html?${tournament.id}" class="tech-item">
                                          <h4><img src="../img/trophy.svg" alt="">${tournament.name} - ${tournament.discipline}</h4>
                                        </a>
                                      </div>`
        });
      }

    } catch (err) {
      console.log(err);
    }
  }

  const populateUpcomingTournaments = async () => {
    try {
      const user_id = parseInt(getCookie('user_id'));

      let res = await fetch(`http://localhost:4000/scoreboards/upcomingTournaments/${user_id}`);

      if (res.status == 200) {
        let response = await res.json();

        for (i = 0; i < response.length; i++) {
          let resTournament = await fetch(`http://localhost:4000/tournaments/${response[i].tournamentId}`);
          if (resTournament.status == 200) {

            let responseTournament = await resTournament.json();
            upcomingTounamentsCard.innerHTML += `<div class="tech-wrapper">
              <a href="http://localhost:5500/frontend/public/views/scoreboardDetails.html?${responseTournament.id}" class="tech-item">
                <h4><img src="../img/trophy.svg" alt="">${responseTournament.name} - ${responseTournament.discipline}</h4>
              </a>
            </div>`;

          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  const populateMyTournaments = async () => {
    try {
      const user_id = parseInt(getCookie('user_id'));

      let res = await fetch(`http://localhost:4000/tournaments/my/${user_id}`);

      if (res.status == 200) {
        let response = await res.json();

        response.forEach(tournament => {
          myTounamentsCard.innerHTML += `<div class="tech-wrapper">
                                        <a href="http://localhost:5500/frontend/public/views/updateScore.html?${tournament.id}" class="tech-item">
                                          <h4><img src="../img/trophy.svg" alt="">${tournament.name} - ${tournament.discipline}</h4>
                                        </a>
                                      </div>`
        });
      }

    } catch (err) {
      console.log(err);
    }
  }

  checkCookie();
  populateTournaments();
  populateScoreboards();
  populateUpcomingTournaments();
  populateMyTournaments();

}