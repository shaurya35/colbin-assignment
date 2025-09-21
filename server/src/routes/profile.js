const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const { authenticateToken } = require('../middleware/auth');
const { validate, profileUpdateSchema } = require('../utils/validation');

const router = express.Router();

// All profile routes require authentication
router.use(authenticateToken);

// GET /api/profile
router.get('/', getProfile);

// PUT /api/profile
router.put('/', validate(profileUpdateSchema), updateProfile);

module.exports = router;


