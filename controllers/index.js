const User = require('../models/User')
const FavoriteProduct = require('../models/FavoriteProduct');

module.exports = {
    getIndex: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.user.id }).lean();
            const favoriteProducts = await FavoriteProduct.find({ user: req.user.id });

            res.header('Cache-Control', 'no-cache')
            res.render('index', { userName: user.name, favoriteProducts: favoriteProducts })
        }catch(err){
            console.log(err)
        }
        
    }
}