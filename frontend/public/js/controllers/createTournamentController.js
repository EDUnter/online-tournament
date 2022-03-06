window.onload = () => {

  const btnRegister = document.getElementById('btnRegister');
  const name = document.getElementById('nameInput');
  const discipline = document.getElementById('disciplineInput');
  const time = document.getElementById('timeInput');
  const gmLocation = document.getElementById('gmLocationInput');
  const maxNr = document.getElementById('maxNrInput');
  const applicationDeadline = document.getElementById('applicationDeadlineInput');
  const sponsorLogos = document.getElementById('sponsorLogosInput');
  const nrRankedPlayers = document.getElementById('nrRankedPlayersInput');

  btnRegister.addEventListener('click', async e => {
    e.preventDefault();

    register();
  });

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

  const register = async () => {
    const organizer = getCookie('user_id');

    let data = {
      name: name.value,
      discipline: discipline.value,
      time: time.value,
      accountId: organizer,
      googleMaps: gmLocation.value,
      maxParticipants: maxNr.value,
      applicationDeadline: applicationDeadline.value,
      nrRankedPlayers: nrRankedPlayers.value,
    }

    try {
      let res = await fetch('http://localhost:4000/tournaments', {
        method: 'POST',
        headers: {
          'Content-Type': ' application/json'
        },
        body: JSON.stringify(data)
      });

      if (res.status == 200) {
        let response = await res.json();

        location.href = "http://localhost:5500/frontend/public/views/index.html";
      }

    } catch (err) {
      console.log(err);
    }
  }
}