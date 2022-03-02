const mongoose = require('mongoose')
const Branch = require('../models/branch')
const Attendance = require('../models/attendance')
const serverError = require('../utils/internalServerError')
const moment = require('moment')

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

//Handle with moment.js
exports.getToday = async (req, res, next) => {

    var start = moment().startOf('day').toISOString();
    var end = moment().endOf('day').toISOString();
    var docs = await Attendance.find({ createdAt: { $gte: start, $lte: end } }).exec().catch(err => {
        return serverError(err, req, res)
    })
    return res.status(200).json(docs)
}

exports.getAllForManager = async (req, res, next) => {
    var start = moment().startOf('day').toISOString();
    var end = moment().endOf('day').toISOString();
    var salesmen = [];
    var docs = await Branch.find({ manager: req.userData.id }).exec().catch(err => {
        serverError(err, req, res)
    })
    docs.forEach((branch) => {
        branch.salesman.forEach((salesman) => {
            salesmen.push(salesman)
        })
    })
    // console.log(salesmen);
    Attendance.find({ $and: [{ createdAt: { $gte: start, $lte: end } }, { user: { $in: salesmen } }] }).populate({ path: 'user', populate: { path: 'branch' } }).exec().then(docs => {
        if (docs.length === 0) return res.status(200).json({ message: "DB is empty" })
        return res.status(200).json(docs)
    }).catch(err => {
        serverError(err, req, res)
    })
}