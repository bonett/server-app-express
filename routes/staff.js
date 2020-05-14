const express = require('express');
const router = express.Router();
const StaffController = require('../controllers/staff');

router.route('/')
    .get(StaffController.index)
    .post(StaffController.newStaff);

router.route('/:staffId')
    .get(StaffController.showStaff)
    .put(StaffController.updateStaff)
    .delete(StaffController.removeStaff);

module.exports = router;