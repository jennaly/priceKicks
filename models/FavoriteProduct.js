const Mongoose = require("mongoose");

const FavoriteProductSchema = new Mongoose.Schema({
    sku: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }
});

const FavoriteProduct = Mongoose.model('FavoriteProduct', FavoriteProductSchema);

module.exports = FavoriteProduct;
