const express = require('express');
const router = express.Router();
const SpecialtyController = require('../controllers/specialty')

router.route('/')
    .get(SpecialtyController.index)
    .post(SpecialtyController.newSpecialty);

router.route('/:id')
    .get(SpecialtyController.showSpecialty)
    .put(SpecialtyController.updateSpecialty)
    .delete(SpecialtyController.removeSpecialty);

module.exports = router;