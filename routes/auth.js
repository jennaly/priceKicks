const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/auth')
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const { body, check } = require('express-validator');

// @desc local auth
// @route GET /auth
router.get('/login', ensureGuest, function (req, res) {
    res.header('Cache-Control', 'no-cache'),
    res.render('login')
});

// @desc local auth
// @route POST /auth
router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failWithError: true,
}), (error, req, res, next) => {
    res.render('login', {
        error: error
    })
});

//@desc Logout User
//@route GET /auth/logout
router.get('/logout', authController.logout)

//@desc Signup 
//@route GET /signup
router.get('/signup', authController.getSignup)


//@desc middleware for Signup
const signupEmailValidator = [
    body('email').isEmail(), 
]

const signupPasswordValidator = [
    check('password')
    .isLength({ min: 8 })
    .withMessage('must be at least 8 characters')
]

//@desc Signup
//@route POST /signup
router.post('/signup', signupEmailValidator, signupPasswordValidator, authController.postSignup) 

module.exports = router