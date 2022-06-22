const mongoose = require('mongoose')
const Attendance = require('../models/attendance')
const Stock = require('../models/stock')
const Sale = require('../models/sale')
const Product = require('../models/product')
const User = require('../models/user')
const serverError = require('../utils/internalServerError')
const moment = require('moment')


//Settings
exports.getAdminData = (req, res, next) => {
    User.find({ _id: req.userData.id }).populate().exec().then(docs => {
        return res.status(200).json(docs)
    }).catch(err => {
        serverError(err, req, res)
    })
}

//updateAdminData


//Sales
exports.getAllSales = (req, res, next) => {
    Sale.find().populate({ path: 'product user' }).exec().then(docs => {
        // if (docs.length === 0) return res.status(200).json({ message: "DB is empty" })
        return res.status(200).json(docs)
    }).catch(err => {
        serverError(err, req, res)
    })
}

exports.getOneSale = (req, res, next) => {
    Sale.find({ _id: req.params.id }).populate({ path: 'product user' }).exec().then(docs => {
        if (docs.length === 0) return res.status(404).json({ message: "Sale not found" })
        return res.status(200).json(docs)
    }).catch(err => {
        serverError(err, req, res)
    })
}


//Stocks
exports.getOneStock = (req, res, next) => {
    Stock.find({ _id: req.params.id }).populate({ path: 'product branch' }).exec().then(docs => {
        if (docs.length === 0) return res.status(404).json({ message: "Stock not found" })
        return res.status(200).json(docs)
    }).catch(err => {
        serverError(err, req, res)
    })
}


exports.getAllStocks = async (req, res, next) => {

    Stock.find().populate({ path: 'product branch' }).exec().then(docs => {
        // if (docs.length === 0) return res.status(200).json({ message: "DB is empty" })
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

exports.deleteStock = async (req, res, next) => {

    Stock.findOneAndUpdate({ _id: req.params.id }, { status: false }, { new: false }).exec().then(doc => {
        if (doc === null) return res.status(404).json({ message: 'Stock not found ' })
        return res.status(201).json({ message: 'Stock deleted ' })
    }).catch(err => {
        serverError(err, req, res)
    })
}

// exports.patchStock = async (req, res, next) => {
//     var doc = await Stock.findOneAndUpdate({ _id: req.params.id }, { quantity: req.body.quantity }, { new: true }).exec().catch(err => {
//         serverError(err, req, res)
//     })
//     console.log(doc)

//     if (doc) {
//         return res.status(201).json(doc)
//     }

//     else {
//         return res.status(404).json({ message: "Stock not Found" })
//     }
// }






//Attendances
exports.attendanceForDay = async (req, res, next) => {
    var start = moment().startOf('day').toISOString();
    var end = moment().endOf('day').toISOString();

    Attendance.find({ createdAt: { $gte: start, $lte: end } }).populate({ path: 'user', populate: { path: 'branch' } }).exec().then(docs => {
        // if (docs.length === 0) return res.status(200).json({ message: "DB is empty" })
        return res.status(200).json(docs)
    }).catch(err => {
        serverError(err, req, res)
    })
}

exports.attendanceForWeek = async (req, res, next) => {
    var start = moment().startOf('week').toISOString();
    var end = moment().endOf('week').toISOString();

    Attendance.find({ createdAt: { $gte: start, $lte: end } }).populate({ path: 'user', populate: { path: 'branch' } }).exec().then(docs => {
        // if (docs.length === 0) return res.status(200).json({ message: "DB is empty" })
        return res.status(200).json(docs)
    }).catch(err => {
        serverError(err, req, res)
    })
}

exports.attendanceForFortnight = async (req, res, next) => {
    var start = moment().startOf('week').toISOString();
    var end = moment().endOf('week').toISOString();

    Attendance.find({ createdAt: { $gte: start, $lte: end } }).populate({ path: 'user', populate: { path: 'branch' } }).exec().then(docs => {
        // if (docs.length === 0) return res.status(200).json({ message: "DB is empty" })
        return res.status(200).json(docs)
    }).catch(err => {
        serverError(err, req, res)
    })
}

exports.attendanceForMonth = async (req, res, next) => {
    var start = moment().startOf('month').toISOString();
    var end = moment().endOf('month').toISOString();

    Attendance.find({ createdAt: { $gte: start, $lte: end } }).populate({ path: 'user', populate: { path: 'branch' } }).exec().then(docs => {
        // if (docs.length === 0) return res.status(200).json({ message: "DB is empty" })
        return res.status(200).json(docs)
    }).catch(err => {
        serverError(err, req, res)
    })
}


//products
exports.getAllProducts = (req, res, next) => {
    Product.find().exec().then(docs => {
        return res.status(200).json(docs)
    }).catch(err => {
        serverError(err, req, res)
    })
}

exports.getOneProduct = (req, res, next) => {
    Product.find({ _id: req.params.id }).exec().then(docs => {
        return res.status(200).json(docs)
    }).catch(err => {
        serverError(err, req, res)
    })
}

exports.addProduct = (req, res, next) => {
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        barcode: req.body.barcode,
        purchase_price: req.body.purchase_price,
        sale_price: req.body.sale_price,
        seige_code: req.body.seige_code,
        supplier: req.body.supplier,
        brand: req.body.brand,
    })
    product.save().then(doc => {
        return res.status(201).json(doc)
    }).catch(err => {
        serverError(err, req, res)
    })
}

exports.deleteProduct = (req, res, next) => {
    Product.findOneAndUpdate({ _id: req.params.id }, { status: false }, { new: false }).exec().then(doc => {
        if (doc === null) return res.status(404).json({ message: 'Product not found ' })
        return res.status(201).json({ message: 'Product deleted' })
    }).catch(err => {
        serverError(err, req, res)
    })
}


//users
exports.getAllUsers = (req, res, next) => {
    User.find().populate('branch').exec().then(docs => {
        return res.status(200).json(docs)
    }).catch(err => {
        serverError(err, req, res)
    })
}

exports.getOneUser = (req, res, next) => {
    User.find({ _id: req.params.id }).populate('branch').exec().then(docs => {
        if (docs.length === 0) return res.status(404).json({ message: "User not found" })
        return res.status(200).json(docs)
    }).catch(err => {
        serverError(err, req, res)
    })
}

// exports.updateUser = (req, res, next) => {
//     User.find({_id:req.params.id}).exec().then(docs => {
//         return res.status(200).json(docs)
//     }).catch(err => {
//         serverError(err, req, res)
//     })
// }

exports.deleteUser = (req, res, next) => {
    User.findOneAndUpdate({ _id: req.params.id }, { status: false }, { new: false }).exec().then(docs => {
        if (docs.length === 0) return res.status(404).json({ message: "User not found" })
        return res.status(201).json({ message: 'User deleted' })
    }).catch(err => {
        serverError(err, req, res)
    })
}