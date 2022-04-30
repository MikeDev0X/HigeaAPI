const express = require('express');
const router = express.Router();
const doctorController = require('../controller/doctor.controller');

router.get('/getDoctor/:idDoctor', doctorController.getDoctor);
router.get('/getPatient/:idPatient', doctorController.getPatient);
router.get('/getPatientsFromDoc/:idDoctor', doctorController.getPatientsFromDoc);

module.exports = router;