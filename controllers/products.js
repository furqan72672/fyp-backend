const Product = require('../models/product')
const serverError = require('../utils/internalServerError')
// const authError = require('../utils/unauthorizedError')

exports.getAll = (req, res, next) => {
    Product.find().exec().then(docs => {
        if (docs.length > 0) {
            return res.status(200).json(docs)
        }
        return res.status(200).json({ message: "DB is empty" })
    }).catch(err => {
        return res.status(500).json({ error: err.message })
    })
}

exports.getOne = (req, res, next) => {
    Product.find({ _id: req.params.productId }).exec().then(docs => {
        if (docs.length > 0) {
            return res.status(200).json(docs[0])
        }
        return res.status(200).json({ message: "Product not found" })
    }).catch(err => {
        return res.status(500).json({ error: err.message })
    })
}

exports.getBarcode = (req, res, next) => {
    Product.find({ barcode: req.params.barcode }).exec().then(docs => {
        if (docs.length > 0) {
            return res.status(200).json(docs[0])
        }
        else {
            return res.status(200).json({ message: "Product not found" })
        }
    }).catch(err => {
        serverError(err, req, res)
    })
}