const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const Role = require('_helpers/role');
const sponsorLogosService = require('../services/sponsor-logos.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    sponsorLogosService.getAll()
        .then(sponsorLogos => res.json(sponsorLogos))
        .catch(next);
}

function getById(req, res, next) {
    sponsorLogosService.getById(req.params.id)
        .then(sponsorLogos => sponsorLogos ? res.json(account) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        type: Joi.string(),
        name: Joi.string(),
        data: Joi.any(),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    sponsorLogosService.create(req.body)
        .then(sponsorLogo => res.json(sponsorLogo))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = {
        id: Joi.number().required(),
        type: Joi.string().required(),
        name: Joi.string().required(),
        data: Joi.any().required(),
    };
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    // users can update their own sponsor logos and admins can update any sponsor logos
    if (Number(req.params.accountId) !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    sponsorLogosService.update(req.params.id, req.body)
        .then(sponsorLogo => res.json(sponsorLogo))
        .catch(next);
}

function _delete(req, res, next) {
    // users can delete their own sponsor logos and admins can delete any sponsor logos
    if (Number(req.params.id) !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    sponsorLogosService.delete(req.params.id)
        .then(() => res.json({ message: 'Sponsor Logo deleted successfully' }))
        .catch(next);
}