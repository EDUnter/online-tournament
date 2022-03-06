const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const tournamentService = require('../services/tournament.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.get('/disciplines/all', getAllDisciplines);
router.get('/my/:id', getMyTournaments);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    tournamentService.getAll()
        .then(tournaments => res.json(tournaments))
        .catch(next);
}

function getById(req, res, next) {
    tournamentService.getById(req.params.id)
        .then(tournaments => tournaments ? res.json(tournaments) : res.sendStatus(404))
        .catch(next);
}

function getAllDisciplines(req, res, next) {
    tournamentService.getAllDisciplines(req.params.id)
        .then(tournaments => tournaments ? res.json(tournaments) : res.sendStatus(404))
        .catch(next);
}

function getMyTournaments(req, res, next) {
    tournamentService.getMyTournaments(req.params.id)
        .then(tournaments => tournaments ? res.json(tournaments) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        discipline: Joi.string().required(),
        time: Joi.date().required(),
        googleMaps: Joi.string().required(),
        maxParticipants: Joi.number().required(),
        applicationDeadline: Joi.date().required(),
        nrRankedPlayers: Joi.number().required(),
        accountId: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    tournamentService.create(req.body)
        .then(account => res.json(account))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        discipline: Joi.string().required(),
        time: Joi.date().required(),
        googleMaps: Joi.string().required(),
        maxParticipants: Joi.number().required(),
        applicationDeadline: Joi.date().required(),
        nrRankedPlayers: Joi.number().required(),
        accountId: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    tournamentService.update(req.params.id, req.body)
        .then(tournament => res.json(tournament))
        .catch(next);
}

function _delete(req, res, next) {
    // users can delete their own tournament and admins can delete any tournament
    if (Number(req.params.id) !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    tournamentService.delete(req.params.id)
        .then(() => res.json({ message: 'Tournament deleted successfully' }))
        .catch(next);
}