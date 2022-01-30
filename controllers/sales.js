const mongoose = require('mongoose')
const serverError = require('../utils/internalServerError')
// const bcrypt = require('bcryptjs')
// const authError = require('../utils/unauthorizedError')
// const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Sale = require('../models/sale')

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

// exports.getProfile = (req, res, next) => {
//     User.find({ _id: req.params.userId }).exec().then(docs => {
//         if (docs.length >= 1) return res.status(200).json(docs)
//         res.status(404).json({ Error: "Profile Not found" })
//     })
// }

// exports.signUp = (req, res, next) => {
//     User.find({ email: req.body.email }).exec().then(docs => {
//         if (docs.length >= 1) return res.status(406).json({ error: 'Email already exists' })
//         else {
//             bcrypt.hash(req.body.password, 10, (err, hash) => {
//                 if (err) return serverError(err, req, res)
//                 else {
//                     const user = new User({
//                         _id: mongoose.Types.ObjectId(),
//                         name: req.body.name,
//                         email: req.body.email,
//                         password: hash,
//                         guard: req.body.guard,
//                         target: req.body.target || null,
//                         salary: req.body.salary || null,
//                         phone: req.body.phone || null,
//                         visa: req.body.visa || null,
//                         address: req.body.address || null,
//                         shift: req.body.shift || null,
//                     })
//                     user.save().then(response => {
//                         res.status(201).json(response)
//                     }).catch(err => {
//                         serverError(err, req, res)
//                     })
//                 }
//             })
//         }
//     }).catch(err => {
//         serverError(err, req, res)
//     })
// }

// exports.signIn = (req, res, next) => {
//     User.find({ email: req.body.email }).exec().then(docs => {
//         if (docs.length < 1) return authError(req, res)
//         bcrypt.compare(req.body.password, docs[0].password, (err, same) => {
//             if (err) return authError(req, res)
//             const token = jwt.sign(
//                 {
//                     email: docs[0].email,
//                     id: docs[0]._id
//                 },
//                 "49486553965335887759405095625744323",
//                 {
//                     expiresIn: "1h"
//                 }
//             )
//             return res.status(201).json({ AccessToken: token })
//         })
//     })
// }