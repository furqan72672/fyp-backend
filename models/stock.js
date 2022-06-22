const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
    },
    status: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Stock', stockSchema)