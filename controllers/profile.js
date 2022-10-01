const User = require('../models/User')

module.exports = {
    getProfile: async (req, res) => {
        try {
            const user = await User.findOne({ _id:req.user.id }).lean();
            let stockXSellerLevel
            switch (user.stockXTransactionFee) {
                case 0.10:
                    stockXSellerLevel = "Level 1";
                    break;
                case 0.095:
                    stockXSellerLevel = "Level 2";
                    break;
                case 0.09:
                    stockXSellerLevel = "Level 3";
                    break;
                case 0.085:
                    stockXSellerLevel = "Level 4";
                    break;
                case 0.08:
                    stockXSellerLevel = "Level 5";
            }

            let goatSellerRating
            switch (user.goatCommissionFee) {
                case 0.095:
                    goatSellerRating = "90 or greater";
                    break;
                case 0.15:
                    goatSellerRating = "70-89";
                    break;
                case 0.20:
                    goatSellerRating = "50-69";
                    break;
                case 0.25:
                    goatSellerRating = "Less than 50";
            }

            return res.render('profile', {
                userName: user.name,
                stockXSellerLevel,
                goatSellerRating
            })

        } catch (err) {
            console.log(err)
        }
    },
    updateProfile: async (req, res) => {
        try {
            await User.findOneAndUpdate(
                { _id: req.user.id },
                {
                    stockXTransactionFee: req.body.stockXTransactionFee,
                    goatCommissionFee: req.body.goatCommissionFee,
                }
              );
              console.log("Changes submitted");
              res.redirect('/');            
        } catch (err) {
            console.log(err)
        }
    } 
}
