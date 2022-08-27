const express = require('express');
const passport = require('passport');
const router = express.Router();
const crypto = require('crypto');
const User = require('../models/User');
const { isBuffer } = require('util');

// @desc local auth
// @route GET /auth
router.get('/login', function (req, res) {
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
        res.redirect('/')
    })
})

//@desc Signup 
//@route GET /signup

router.get('/signup', function (req, res) {
    res.render('signup'); 
})

//@desc Signup
//@route POST /signup

router.post('/signup', function (req, res) {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function(err, password) {
        if (err) { return res.render('error') }

        const user = await User.create(
            {
             name: req.body.name,
             email: req.body.email,
             hashedPassword: password,
             salt: salt
            }
        );

        const userObject = {
            id: user._id,
            email: user.email,
        };

        req.login(userObject, function (err) {
            if (err) { return res.render('error') };
            res.redirect('/');
        });
    })
   
    
})

module.exports = router