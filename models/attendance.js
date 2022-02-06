const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Attendance', attendanceSchema)