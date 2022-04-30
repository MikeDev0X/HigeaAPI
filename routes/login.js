const express = require('express');
const router = express.Router();
const loginController = require('../controller/login.controller');

router.post('/loginPatient', loginController.loginPatient);

module.exports = router;