const express = require('express');
const router = express.Router();
const TypeController = require('../controllers/type');

router.route('/')
    .get(TypeController.index)
    .post(TypeController.newType);

router.route('/:typeId')
    .get(TypeController.showType)
    .put(TypeController.updateType)
    .delete(TypeController.removeType);

module.exports = router;