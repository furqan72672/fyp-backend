const mongoose = require('mongoose')
const serverError = require('../utils/internalServerError')
const Product = require('../models/product')
const Request = require('../models/request')
const Branch = require('../models/branch')
const User = require('../models/user')

exports.addRequest = (req, res, next) => {
    Product.find({ barcode: req.body.product }).exec().then(docs => {
        if (docs.length === 0) return res.status(404).json({ error: `No Product found against barcode ${req.body.product}` })
        const request = new Request({
            _id: mongoose.Types.ObjectId(),
            product: docs[0]._id,
            user: req.userData.id,
            quantity: req.body.quantity,
            type: req.body.type
        })
        request.save().then(response => {
            return res.status(201).json(response)
        }).catch(err => {
            return serverError(err, req, res)
        })
    })
}

exports.getAllForManager = async (req, res, next) => {
    var docs = await User.find({ _id: req.userData.id }).exec().catch(err => {
        return serverError(err, req, res)
    })

    var branches = [];
    docs[0].branch.forEach(branch => {
        branches.push(branch)
    })

    docs = await Branch.find({ _id: { $in: branches } }, { salesman: 1, _id: 0 }).exec().catch(err => {
        return serverError(err, req, res)
    })

    var salesmen = [];
    docs[0].salesman.forEach(salesman => {
        salesmen.push(salesman)
    })

    docs = await Request.find({ user: { $in: salesmen } }).populate([{ path: 'product' }, { path: 'user', populate: { path: 'branch' } }]).exec().catch(err => {
        return serverError(err, req, res)
    })

    if (docs.length > 0) {
        return res.status(200).json(docs)
    }
    else {
        return res.status(406).json({ message: "No requests found" })
    }

}

exports.delete = (req, res, next) => {
    Request.deleteOne({ _id: req.params.id }).exec().then(doc => {
        console.log(doc)
        // return res.status(201).json({})
        if (doc.deletedCount === 1) {
            return res.status(201).json({ deleted: 1 })
        }
        else {
            return res.status(404).json({ deleted: "Request not found" })
        }
    }).catch(err => {
        return serverError(err, req, res)
    })

}