const Mongoose = require("mongoose")
const User = require('./user')

const UserProductSchema = new Mongoose.Schema({
    SKU: {
        type: String,
        required: true,
    },
    User: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }

})

const UserProduct = connection.model('UserProduct', UserSchema);
module.exports = UserProduct
