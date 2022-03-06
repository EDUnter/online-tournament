const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    getByTournament,
    getByTournamentByAccount,
    getUpcomingTournaments,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const scoreboards = await db.Scoreboard.findAll();
    return scoreboards.map(x => basicDetails(x));
}

async function getById(id) {
    const scoreboard = await getScoreboard(id);
    return basicDetails(scoreboard);
}

async function getByTournament(tournamentId) {
    const scoreboard = await db.Scoreboard.findAll({
        where: {
            tournamentId: tournamentId
        }
    });

    return scoreboard;
}

async function getByTournamentByAccount(params) {
    console.log(params.accountId);
    const scoreboard = await db.Scoreboard.findAll({
        where: {
            tournamentId: params.tournamentId,
            accountId: params.accountId
        }
    });
    return scoreboard;
}

async function getUpcomingTournaments(id) {
    const scoreboards = await db.Scoreboard.findAll({
        where: {
            accountId: id
        }
    });
    return scoreboards.map(x => basicDetails(x));
}

async function create(params) {
    const tournamentId = params.tournamentId;

    const tournament = await db.Tournament.findByPk(tournamentId);
    if (!tournament) throw 'Tournament not found';

    const { count } = await db.Scoreboard.findAndCountAll({
        where: {
            tournamentId: tournamentId
        }
    });

    if (tournament.maxParticipants > count) {
        const scoreboard = new db.Scoreboard(params);

        // save scoreboard
        await scoreboard.save();

        return basicDetails(scoreboard);
    } else throw 'Tournament lotation is full'
}

async function update(id, params) {
    const scoreboard = await getScoreboard(id);

    // copy params to scoreboard and save
    Object.assign(scoreboard, params);
    scoreboard.updated = Date.now();
    await scoreboard.save();

    return basicDetails(scoreboard);
}

async function _delete(id) {
    const scoreboard = await getScoreboard(id);
    await scoreboard.destroy();
}

// helper functions

async function getScoreboard(id) {
    const scoreboard = await db.Scoreboard.findByPk(id);
    if (!scoreboard) throw 'Scoreboard not found';
    return scoreboard;
}

function basicDetails(scoreboard) {
    const { id, score, created, updated, accountId, tournamentId } = scoreboard;
    return { id, score, created, updated, accountId, tournamentId };
}