const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    type: {
        type: Number,
        required: true
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Request', requestSchema)