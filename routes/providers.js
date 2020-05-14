const express = require('express');
const router = express.Router();
const ProviderController = require('../controllers/provider');

const Provider = require('../models/provider');

router.route('/')
    .get(ProviderController.index)
    .post(ProviderController.newProvider);

router.route('/:providerId')
    .get(ProviderController.showProvider)
    .put(ProviderController.updateProvider)
    .delete(ProviderController.removeProvider);

module.exports = router;