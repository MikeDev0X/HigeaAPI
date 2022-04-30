const express = require('express');
const router = express.Router();
const signUpController = require('../controller/signup.controller');

router.post('/signUp', signUpController.insertUser);
router.post('/doctorForms', signUpController.doctorForms);
router.post('/patientForms', signUpController.patientForms);

router.get('/getAllUsers', signUpController.getAllUsers);

module.exports = router;