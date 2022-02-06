const mongoose = require('mongoose')
const { required } = require('nodemon/lib/config')

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
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
},
    { timestamps: true }
)

module.exports = mongoose.model('Branch', branchSchema)