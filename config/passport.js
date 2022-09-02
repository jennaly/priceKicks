const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const User = require('../models/User');

module.exports = function (passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, cb) => {
        
        // Check if the provided email is in the database.
        const user = await User.findOne({ email: email });
        
        // if user is not in database, return error message 
        if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }
        
        // if user is in database, verify hashed password is password submitted by user
        crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, loginPassword) {
            if (err) { return cb(err); }
            if (user.hashedPassword !== loginPassword.toString('hex')) {
                return cb(null, false, { message: 'Incorrect username or password.' });
            }
            
            // if hashed password == password, authenticate user
            return cb(null, user);
        });
    
    }));
    
    // Configure passport to persist user information in the login session
    passport.serializeUser(function(user, done) {
        done(null, { id: user.id, email: user.email });
    });
    
    passport.deserializeUser(function (user, done) {
        return done(null, user);
    });
      
}

