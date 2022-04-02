const express = require('express');
const router = express.Router();

// validaters
const validateUserSchema = require('../schema/validate-user-schema');
const validateRequestSchema = require('../middleware/validate-request-schema');

const userCtrl = require('../controllers/user');

router.post('/signup', validateUserSchema, validateRequestSchema, userCtrl.signup);
router.post('/login', userCtrl.login);

router.get('/users', userCtrl.users);

module.exports = router;