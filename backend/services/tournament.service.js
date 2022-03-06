const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    getMyTournaments,
    getAllDisciplines,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const tournaments = await db.Tournament.findAll();
    return tournaments.map(x => basicDetails(x));
}

async function getById(id) {
    const tournament = await getTournament(id);
    return basicDetails(tournament);
}

async function getMyTournaments(id) {
    const tournaments = await db.Tournament.findAll({
        where: {
            accountId: id
        }
    });
    return tournaments.map(x => basicDetails(x));
}

async function getAllDisciplines() {
    const tournaments = await db.Tournament.findAll();
    let disciplines = [];
    tournaments.forEach(tournament => {
        disciplines.indexOf(tournament.discipline) === -1 ? disciplines.push(tournament.discipline) : console.log("This item already exists");
    });
    return disciplines;
}

async function create(params) {
    const tournament = new db.Tournament(params);

    // save account
    await tournament.save();

    return basicDetails(tournament);
}

async function update(id, params) {
    const tournament = await getTournament(id);

    // copy params to account and save
    Object.assign(tournament, params);
    tournament.updated = Date.now();
    await tournament.save();

    return basicDetails(tournament);
}

async function _delete(id) {
    const tournament = await getTournament(id);
    await tournament.destroy();
}

// helper functions

async function getTournament(id) {
    const tournament = await db.Tournament.findByPk(id);
    if (!tournament) throw 'Tournament not found';
    return tournament;
}

function basicDetails(tournament) {
    const { id, name, discipline, time, googleMaps, maxParticipants, applicationDeadline, nrRankedPlayers, created, updated, accountId } = tournament;
    return { id, name, discipline, time, googleMaps, maxParticipants, applicationDeadline, nrRankedPlayers, created, updated, accountId };
}