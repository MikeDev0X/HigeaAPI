const express = require('express');
const router = express.Router();
const loginController = require('../controller/login.controller');

router.post('/login', loginController.login);
//router.get('/getAllUsers', loginController.getAllUsers);

module.exports = router;