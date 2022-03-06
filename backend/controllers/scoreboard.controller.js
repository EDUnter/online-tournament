const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const scoreboardService = require('../services/scoreboard.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.get('/all/:tournamentId', getByTournament);
router.get('/upcomingTournaments/:id', getUpcomingTournaments);
router.get('/getByTournamentByAccount/:tournamentId/:accountId', getByTournamentByAccount);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    scoreboardService.getAll()
        .then(scoreboards => res.json(scoreboards))
        .catch(next);
}

function getById(req, res, next) {
    scoreboardService.getById(req.params.id)
        .then(scoreboards => scoreboards ? res.json(scoreboards) : res.sendStatus(404))
        .catch(next);
}

function getByTournament(req, res, next) {
    scoreboardService.getByTournament(req.params.tournamentId)
        .then(scoreboards => scoreboards ? res.json(scoreboards) : res.sendStatus(404))
        .catch(next);
}

function getByTournamentByAccount(req, res, next) {
    scoreboardService.getByTournamentByAccount(req.params)
        .then(scoreboards => scoreboards ? res.json(scoreboards) : res.sendStatus(404))
        .catch(next);
}

function getUpcomingTournaments(req, res, next) {
    scoreboardService.getUpcomingTournaments(req.params.id)
        .then(scoreboards => scoreboards ? res.json(scoreboards) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        score: Joi.number().required(),
        tournamentId: Joi.number().required(),
        accountId: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    scoreboardService.create(req.body)
        .then(scoreboard => res.json(scoreboard))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        score: Joi.number().required(),
        tournamentId: Joi.number().required(),
        accountId: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    scoreboardService.update(req.params.id, req.body)
        .then(scoreboard => res.json(scoreboard))
        .catch(next);
}

function _delete(req, res, next) {
    scoreboardService.delete(req.params.id)
        .then(() => res.json({ message: 'Scoreboard deleted successfully' }))
        .catch(next);
}