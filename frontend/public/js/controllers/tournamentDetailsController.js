window.onload = () => {

    const btnRegister = document.getElementById('btnRegister');
    const name = document.getElementById('nameInput');
    const discipline = document.getElementById('disciplineInput');
    const time = document.getElementById('timeInput');
    const gmLocation = document.getElementById('gmLocationInput');
    const maxNr = document.getElementById('maxNrInput');
    const applicationDeadline = document.getElementById('applicationDeadlineInput');
    const nrRankedPlayers = document.getElementById('nrRankedPlayersInput');
    const organizer = document.getElementById('organizerInput');

    const params = new URLSearchParams(window.location.search);
    let tournamentId = null;
    for (const param of params) {
        tournamentId = param[0];
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

    const getTournamentDetails = async (tournamentId) => {
        try {
            let resTournament = await fetch(`http://localhost:4000/tournaments/${tournamentId}`);

            if (resTournament.status == 200) {
                let responseTournament = await resTournament.json();

                let resOrganizer = await fetch(`http://localhost:4000/accounts/${responseTournament.accountId}`);

                if (resOrganizer.status == 200) {
                    let responseOrganizer = await resOrganizer.json();

                    const userId = getCookie('user_id');

                    if (userId == responseTournament.accountId) {
                        btnRegister.value = 'Edit Tournament';

                        btnRegister.addEventListener('click', e => {
                            e.preventDefault();

                            edit(tournamentId);
                        });
                    } else {
                        btnRegister.addEventListener('click', e => {
                            e.preventDefault();

                            apply(tournamentId);
                        })
                    }

                    name.value = responseTournament.name;
                    discipline.value = responseTournament.discipline;
                    time.value = responseTournament.time;
                    maxNr.value = responseTournament.maxParticipants;
                    applicationDeadline.value = responseTournament.applicationDeadline;
                    nrRankedPlayers.value = responseTournament.nrRankedPlayers;
                    gmLocation.value = responseTournament.googleMaps;
                    organizer.value = `${responseOrganizer.firstName} ${responseOrganizer.lastName}`;
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const apply = async (tournamentId) => {
        const userId = parseInt(getCookie('user_id'));

        let data = {
            accountId: userId,
            tournamentId: tournamentId,
            score: 0
        }

        try {
            let res = await fetch('http://localhost:4000/scoreboards', {
                method: 'POST',
                headers: {
                    'Content-Type': ' application/json'
                },
                body: JSON.stringify(data)
            });

            if (res.status == 200) {
                let response = await res.json();

                location.href = "http://localhost:5500/frontend/public/views/licenseRanking.html";
            }

        } catch (err) {
            console.log(err);
        }
    }

    const edit = async (tournamentId) => {
        const userId = parseInt(getCookie('user_id'));

        let data = {
            name: name.value,
            discipline: discipline.value,
            time: time.value,
            accountId: userId,
            googleMaps: gmLocation.value,
            maxParticipants: maxNr.value,
            applicationDeadline: applicationDeadline.value,
            nrRankedPlayers: nrRankedPlayers.value,
        }

        try {
            let res = await fetch(`http://localhost:4000/tournaments/${tournamentId}`, {
                method: 'PUT',
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

    getTournamentDetails(tournamentId);
}