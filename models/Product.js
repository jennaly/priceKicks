const Mongoose = require("mongoose");

const UserProductSchema = new Mongoose.Schema({
    sku: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }
});

const UserProduct = Mongoose.model('UserProduct', UserProductSchema);

module.exports = UserProduct;
