const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index')
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', ensureAuth, indexController.getIndex)

module.exports = router