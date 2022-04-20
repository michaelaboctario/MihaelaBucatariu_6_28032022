const express = require('express');
const router = express.Router();

// validaters
const validateEmail = require('../middleware/validate-email');
const validatePassword = require('../middleware/validate-password');

const userCtrl = require('../controllers/user');

router.post('/signup', validateEmail, validatePassword, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;