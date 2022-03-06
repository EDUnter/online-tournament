window.onload = () => {

  const btnUpdateScore = document.getElementById('btnUpdateScore');
  const users = document.getElementById('userDrop');
  const score = document.getElementById('scoreInput');

  btnUpdateScore.addEventListener('click', (e) => {
    e.preventDefault();

    updateScore();
  });

  const populateDrop = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      let tournamentId = null;
      for (const param of params) {
        tournamentId = param[0];
      }

      let res = await fetch(`http://localhost:4000/scoreboards/all/${tournamentId}`);

      if (res.status == 200) {
        let response = await res.json();

        for (i = 0; i < response.length; i++) {
          let resAccount = await fetch(`http://localhost:4000/accounts/${response[i].accountId}`);
          let responseAccount = await resAccount.json();

          users.innerHTML += `<option value=${responseAccount.id}>${responseAccount.firstName} ${responseAccount.lastName}</option>`;
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  const updateScore = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      let tournamentId = null;
      for (const param of params) {
        tournamentId = param[0];
      }

      let resScore = await fetch(`http://localhost:4000/scoreboards/all/${tournamentId}`);
      if (resScore.status == 200) {
        let responseScore = await resScore.json();
        
        let data = {
          score: score.value,
          accountId: users.value,
          tournamentId: tournamentId
        }

        let res = await fetch(`http://localhost:4000/scoreboards/${responseScore[0].id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (res.status == 200) {
          let response = await res.json();
  
          location.href = "http://localhost:5500/frontend/public/views/index.html";
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  populateDrop();
}