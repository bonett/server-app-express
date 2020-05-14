const express = require('express');
const router = express.Router();
const StatusController = require('../controllers/status');

router.route('/')
    .get(StatusController.index)
    .post(StatusController.newStatus);

router.route('/:statusId')
    .get(StatusController.showStatus)
    .put(StatusController.updateStatus)
    .delete(StatusController.removeStatus);

module.exports = router;