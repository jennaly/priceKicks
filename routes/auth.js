const express = require('express')
const passport = require('passport')
const localStrategy = require('passport-local')
const crypto = require('crypto')
const User = require('../models/User') 
const router = express.Router()

// @desc local auth
// @route GET /auth
router.get('/login', function (req, res, next) {
    res.render('login')
    next()
})

module.exports = router