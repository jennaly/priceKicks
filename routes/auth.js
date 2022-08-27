const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc local auth
// @route GET /auth
router.get('/login', function (req, res, next) {
    res.render('login')
    next()
});

// @desc local auth
// @route POST /auth
router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}))

//@desc Logout User
//@route /auth/logout

router.get('/logout', (req,res,next) => {
    req.logout(function(err) {
        if (err) {return next(err)}
        res.redirect('/')
    })
})


module.exports = router