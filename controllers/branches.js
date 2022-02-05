const mongoose = require('mongoose')
const serverError = require('../utils/internalServerError')
const User = require('../models/user')
const Branch = require('../models/branch')

exports.getUserBranch = (req, res, next) => {
    Branch.find({ _id: req.params.id }).exec().then(docs => {
        if (docs === 0) return res.status(404).json({ Error: `No Branch found against id ${req.body.branch}` })
    }).catch(err => {
        return serverError(err, req, res)
    });
}