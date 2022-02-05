const mongoose = require('mongoose')
const Stock = require('../models/stock')
const Branch = require('../models/branch')
const serverError = require('../utils/internalServerError')

exports.getAllForManager = async (req, res, next) => {
    // var bran = [];
    var docs = await Branch.find({ manager: req.userData.id }).exec().catch(err => {
        serverError(err, req, res)
    })
    Stock.find({ branch: { $in: docs } }).populate({ path: 'product branch' }).exec().then(docs => {
        if (docs.length === 0) return res.status(200).json({ message: "DB is empty" })
        return res.status(200).json(docs)
    }).catch(err => {
        serverError(err, req, res)
    })
}

exports.addStock = async (req, res, next) => {
    var docs = await Stock.find({ $and: [{ branch: req.body.branch }, { product: req.body.product }] }).exec().catch(err => {
        serverError(err, req, res)
    })

    if (docs.length > 0) {
        return res.status(406).json({ message: "Stock already exists" })
    }

    else {
        const stock = new Stock({
            _id: mongoose.Types.ObjectId(),
            branch: req.body.branch,
            product: req.body.product,
            quantity: req.body.quantity
        })
        stock.save().then(doc => {
            return res.status(201).json(doc)
        }).catch(err => {
            serverError(err, req, res)
        })
    }
}