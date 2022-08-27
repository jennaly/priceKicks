const User = require('../models/User')

module.exports = {
    signUp: (req, res) => {
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
       
    }
}