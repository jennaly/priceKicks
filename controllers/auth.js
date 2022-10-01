const crypto = require('crypto');
const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.getLogin = (req, res) => {
    res.header('Cache-Control', 'no-cache'),
    res.render('login')
}

exports.postLogin = (error, req, res, next) => {
    res.render('login', {
        error: error
    })
}


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

        User.findOne({ email: req.body.email }, async (err, existingUser) => {
            if (err) { return next(err) }
            if (existingUser) {
                console.log(existingUser)
                return res.render('signup', {
                    'existingAccountError': 'PriceKicks account already exists'
                })
            } else {
                const user = await User.create(
                    {
                    name: req.body.name,
                    email: req.body.email,
                    stockXTransactionFee: req.body.stockXTransactionFee,
                    goatCommissionFee: req.body.goatCommissionFee,
                    hashedPassword: password.toString('hex'),
                    salt: salt
                    }
                );
            
                const userObject = {
                    id: user._id,
                    email: user.email,
                };

                user.save((err) => {
                    if (err) { return res.render('error') }
                    req.login(userObject, function (err) {
                        if (err) { return res.render('error') };
                        return res.redirect('/');
                    });
                })
            }
        })
    })
}

exports.logout = (req, res) => {
    req.logout(() => {
        console.log('User has logged out.');
        res.redirect('/')
      })
      
}