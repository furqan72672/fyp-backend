const mongoose = require('mongoose')

const branchSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: Number,
        default: false,
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Branch', branchSchema)