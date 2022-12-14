const Mongoose = require('mongoose');

const UserSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    stockXTransactionFee: {
        type: Number,
        required: true
    },
    goatCommissionFee: {
        type: Number,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
});

const User = Mongoose.model('User', UserSchema);

module.exports = User;