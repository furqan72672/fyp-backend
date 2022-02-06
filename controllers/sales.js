const mongoose = require('mongoose')
const serverError = require('../utils/internalServerError')
const Sale = require('../models/sale')
const Branch = require('../models/branch')
const Product = require('../models/product')

exports.addSale = (req, res, next) => {
    Product.find({ barcode: req.body.product }).exec().then(docs => {
        if (docs.length === 0) return res.status(404).json({ Error: `No Product found against barcode ${req.body.product}` })
        const sale = new Sale({
            _id: mongoose.Types.ObjectId(),
            product: docs[0]._id,
            user: req.userData.id,
            sold: req.body.quantity
        })
        sale.save().then(response => {
            return res.status(201).json(response)
        }).catch(err => {
            return serverError(err, req, res)
        })
    })
}

exports.getAll = (req, res, next) => {
    Sale.find().populate('user').exec().then(docs => {
        if (docs.length === 0) return res.status(200).json({ message: "DB is empty" })
        return res.status(200).json(docs)
    }).catch()
}

exports.getAllForManager = async (req, res, next) => {
    var salesmen = [];
    var docs = await Branch.find({ manager: req.userData.id }).exec().catch(err => {
        serverError(err, req, res)
    })
    docs.forEach((branch) => {
        branch.salesman.forEach((salesman) => {
            salesmen.push(salesman)
        })
    })
    console.log(salesmen);
    Sale.find({ user: { $in: salesmen } }).populate({ path: 'user', populate: { path: 'branch' } }).exec().then(docs => {
        if (docs.length === 0) return res.status(200).json({ message: "DB is empty" })
        return res.status(200).json(docs)
    }).catch(err => {
        serverError(err, req, res)
    })
}