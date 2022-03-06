window.onload = () => {

    const title = document.getElementById('title');
    const table = document.getElementById('table');

    const params = new URLSearchParams(window.location.search);
    let tournamentId = null;
    for (const param of params) {
        tournamentId = param[0];
    }

    const populateScoreboard = async (tournamentId) => {
        try {
            let res = await fetch(`http://localhost:4000/scoreboards/all/${tournamentId}`);

            if (res.status == 200) {
                let response = await res.json();

                for (i = 0; i < response.length; i++) {
                    let resAccount = await fetch(`http://localhost:4000/accounts/${response[i].accountId}`);

                    if (res.status == 200) {
                        let responseAccount = await resAccount.json();
                        table.innerHTML += `<tr><td>${i + 1}</td><td>${responseAccount.firstName} ${responseAccount.lastName}</td><td>${response[i].score}</td></tr>`;
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    populateScoreboard(tournamentId);
}