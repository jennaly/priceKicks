const User = require('../models/User');
const FavoriteProduct = require('../models/FavoriteProduct');

module.exports.saveProduct = async (req, res) => {
    try {
        await FavoriteProduct.create({ 
            sku: req.body.sku, 
            imageUrl: req.body.imageUrl, 
            productName: req.body.productName, 
            user: req.user.id 
        })

        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
}