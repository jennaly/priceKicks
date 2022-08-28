const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/auth')
const { ensureAuth, ensureGuest } = require('../middleware/auth');

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
    failureRedirect: '/login'
}))

//@desc Logout User
//@route GET /auth/logout
router.get('/logout', (req,res) => {
    req.logout(function(err) {
        if (err) {return next(err)}
        res.redirect('/login')
    })
})

//@desc Signup 
//@route GET /signup
router.get('/signup', function (req, res) {
    res.render('signup'); 
})

//@desc Signup
//@route POST /signup
router.post('/signup', authController.signUp)

module.exports = router