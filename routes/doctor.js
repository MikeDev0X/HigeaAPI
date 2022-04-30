const express = require('express');
const router = express.Router();
const doctorController = require('../controller/doctor.controller');

router.get('/getDoctor', doctorController.getDoctor);

module.exports = router;