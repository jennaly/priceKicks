const express = require('express');
const profile = require('../controllers/profile');
const router = express.Router();
const profileController = require('../controllers/profile')
const { ensureAuth, ensureGuest } = require('../middleware/auth');


router.get('/', ensureAuth, profileController.getProfile);
router.put('/', profileController.updateProfile)

module.exports = router