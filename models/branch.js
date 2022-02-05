const mongoose = require('mongoose')

const branchSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    store_name: {
        type: String,
        required: true
    },
    rent: {
        type: Number,
    },
    salesman: {
        type: Array,
        ref: 'User',
        required: true,
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    location: {
        lat: {
            type: Number,
            required: true
        },
        long: {
            type: Number,
            required: true
        }
    },
},
    { timestamps: true }
)

module.exports = mongoose.model('Branch', branchSchema)