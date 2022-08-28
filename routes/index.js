const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', ensureAuth, (req, res) => {
    res.header('Cache-Control', 'no-cache')
    res.render('dashboard')
})

module.exports = router