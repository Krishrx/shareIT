const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
//login user
router.post('/login', userController.login);

//signup user
router.post('/signup', userController.signup);

module.exports = router;