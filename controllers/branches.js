const mongoose = require('mongoose')
const serverError = require('../utils/internalServerError')
const User = require('../models/user')
const Branch = require('../models/branch')

exports.addBranch = async (req, res, next) => {
    var flag = 0;
    var docs = await User.find({ _id: req.body.manager }).exec().catch(err => {
        return serverError(err, req, res)
    });
    if (docs.length === 0) return res.status(404).json({ Error: `No Manager found against id ${req.body.manager}` })
    if (req.body.salesman.length === 0) return res.status(406).json({ Error: `Please add salesmen for this branch` })
    docs = await User.find({ _id: { $in: req.body.salesman } }).exec().catch(err => {
        return serverError(err, req, res)
    })
    var ids = []
    if (docs.length != req.body.salesman.length) {
        docs.forEach(doc => {
            ids.push(doc._id)
        });
        return res.status(404).json({ Error: `Some salesman ids are incorrect or you are using same id repeatedly. Salesman found were ${ids}` })
    }
    const branch = new Branch({
        _id: mongoose.Types.ObjectId(),
        store_name: req.body.store_name,
        rent: req.body.rent,
        salesman: req.body.salesman,
        manager: req.body.manager,
        location: {
            lat: req.body.location.lat,
            long: req.body.location.long
        }
    })
    branch.save().then(doc => {
        return res.status(201).json(doc)
    }).catch(err => {
        return serverError(err, req, res)
    })

    // Branch.find({ _id: req.body.branch }).exec().then(docs => {
    //     if (docs === 0) return res.status(404).json({ Error: `No Branch found against id ${req.body.branch}` })
    // }).catch(err => {
    //     return serverError(err, req, res)
    // });
}