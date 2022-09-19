const User = require('../models/User')


module.exports = {
    getIndex: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.user.id }).lean();
            res.header('Cache-Control', 'no-cache')
            res.render('index', { userName: user.name })
        }catch(err){
            console.log(err)
        }
        
    }
}