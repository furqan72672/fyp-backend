const jwt = require('jsonwebtoken')
const authError = require('../utils/unauthorizedError')
const User = require('../models/user')
const serverError = require('../utils/internalServerError')


module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decodedToken = jwt.verify(token, "49486553965335887759405095625744323")
        req.userData = decodedToken
        var user = await User.find({ _id: decodedToken.id }).exec().catch(err => {
            return serverError(err, req, res)
        })
        if (user[0].guard != 2) throw ("err")
        else next()
    }
    catch (err) {
        authError(req, res, next)
    }
}