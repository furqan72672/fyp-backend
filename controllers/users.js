const mongoose = require('mongoose')
const User = require('../models/user')
const serverError = require('../utils/internalServerError')
const bcrypt = require('bcryptjs')
const authError = require('../utils/unauthorizedError')
const jwt = require('jsonwebtoken')


exports.getProfile = (req, res, next) => {
    User.find({ _id: req.userData.id }).populate({ path: 'branch', populate: { path: 'manager salesman' } }).exec().then(docs => {
        if (docs.length >= 1) return res.status(200).json(docs[0])
        res.status(404).json({ error: "Profile Not found" })
    })
}

exports.signUp = (req, res, next) => {
    User.find({ email: req.body.email }).exec().then(docs => {
        if (docs.length >= 1) return res.status(406).json({ error: 'Email already exists' })
        else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) return serverError(err, req, res)
                else {
                    const user = new User({
                        _id: mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        guard: req.body.guard,
                        target: req.body.target,
                        salary: req.body.salary,
                        phone: req.body.phone,
                        visa: req.body.visa,
                        address: req.body.address,
                        shift: req.body.shift,
                    })
                    user.save().then(response => {
                        res.status(201).json(response)
                    }).catch(err => {
                        serverError(err, req, res)
                    })
                }
            })
        }
    }).catch(err => {
        serverError(err, req, res)
    })
}

exports.signIn = (req, res, next) => {
    User.find({ email: req.body.email }).exec().then(docs => {
        if (docs.length === 0) return authError(req, res)
        bcrypt.compare(req.body.password, docs[0].password, (err, same) => {
            if (same) {
                const token = jwt.sign(
                    {
                        email: docs[0].email,
                        id: docs[0]._id
                    },
                    "49486553965335887759405095625744323",
                    {
                        expiresIn: "24h"
                    }
                )
                return res.status(201).json({ AccessToken: token })
            }
            else return authError(req, res)
        })
    })
}