
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const User = require('../models/User');

// set up localstrategy
const ourStrategy = new LocalStrategy({
  usernameField: 'email',
}, (email, password, cb) => {
  
  // Check if the provided email is in the database.
  const user = await User.findOne({ email: email });

  // if user is not in database, return error message 
  if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }

  // if user is in database, verify hashed password is password submitted by user
  crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
    if (err) { return cb(err); }
    if (!crypto.timingSafeEqual(user.hashedPassword, hashedPassword)) {
      return cb(null, false, { message: 'Incorrect username or password.' });
    }
      
    // if hashed password == password, authenticate user
    return cb(null, user);
  });


});

// Mount auth strategy for sign in events.
passport.use(ourStrategy);

// Configure passport to persist user information in the login session
passport.serializeUser(function(user, done) {
  done(null, { id: user.id, username: user.username });
})

passport.deserializeUser(function (user, done) {
  return done(null, user);
})

