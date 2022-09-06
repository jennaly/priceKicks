const crypto = require('crypto');
const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.getSignup = (req, res) => {
    if (req.user) {
        return res.redirect('/')
    }
    res.render('signup', {
        errors: []
    })
}

exports.postSignup = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        console.log(errors.array())
        return res.render('signup', {
            errors : errors.array()
        })
    
    } 

    const salt = crypto.randomBytes(16).toString('hex');

    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function(err, password) {
        if (err) { return res.render('error') }

        const user = await User.create(
            {
            name: req.body.name,
            email: req.body.email,
            hashedPassword: password.toString('hex'),
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
}

exports.logout = (req, res) => {
    req.logout(function(err) {
        if (err) {return next(err)}
        res.redirect('/login')
    })
}