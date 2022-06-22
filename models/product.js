const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    barcode: {
        type: String,
        required: true,
        unique: true,
    },
    purchase_price: {
        type: Number,
        required: true,
    },
    sale_price: {
        type: Number,
        required: true,
    },
    seige_code: {
        type: String,
        required: true,
    },
    supplier: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)