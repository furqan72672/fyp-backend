const mongoose = require('mongoose')
const serverError = require('../utils/internalServerError')
const Product = require('../models/product')
const Request = require('../models/request')

exports.addRequest = (req, res, next) => {
    Product.find({ barcode: req.body.product }).exec().then(docs => {
        if (docs.length === 0) return res.status(404).json({ Error: `No Product found against barcode ${req.body.product}` })
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