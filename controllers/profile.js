const User = require('../models/User')

module.exports = {
    getProfile: async (req, res) => {
        try {
            const user = await User.findOne({ _id:req.user.id }).lean();
            return res.render('profile', {
                stockXTransactionFee,
                goatCommissionFee
            })
        } catch (err) {
            console.log(err)
        }
    }
}