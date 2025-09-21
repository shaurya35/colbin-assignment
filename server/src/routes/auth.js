const express = require('express');
const { register, login } = require('../controllers/authController');
const { validate, registerSchema, loginSchema } = require('../utils/validation');

const router = express.Router();

// POST /api/auth/register
router.post('/register', validate(registerSchema), register);

// POST /api/auth/login
router.post('/login', validate(loginSchema), login);

module.exports = router;


