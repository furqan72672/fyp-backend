const mongoose = require('mongoose')
const Branch = require('../models/branch')
const Attendance = require('../models/attendance')
const serverError = require('../utils/internalServerError')

exports.markAttendance = async (req, res, next) => {
    var docs = await Branch.find({ location: { $near: { $geometry: { type: "Point", coordinates: [req.body.longitude, req.body.latitude] }, $maxDistance: 1000 } } }).exec().catch(err => {
        return serverError(err, req, res)
    })
    if (docs.length === 1) {
        const attendance = new Attendance({
            _id: mongoose.Types.ObjectId(),
            user: req.userData.id,
            status: true
        })
        attendance.save().then(doc => {
            return res.status(201).json(doc)
        }).catch(err => {
            return serverError(err, req, res)
        })
    }
    else {
        return res.status(406).json({ message: "You are not in a registered branch" })
    }
}

exports.getToday = async (req, res, next) => {
    var start = new Date();
    start.setHours(0, 0, 0, 0);

    var end = new Date();
    end.setDate(end.getDate() + 1)
    end.setHours(0, 0, 0, 0);


    var docs = await Attendance.find({ createdAt: { $gte: start, $lt: end } }).exec().catch(err => {
        return serverError(err, req, res)
    })
    return res.status(200).json(docs)

}