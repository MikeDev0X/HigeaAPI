const express = require('express');
const router = express.Router();
const doctorController = require('../controller/doctor.controller');

router.get('/getDoctor', doctorController.getDoctor);
router.get('/getPatient', doctorController.getPatient);

module.exports = router;