const express = require('express')
const router = express.Router()
const auth = require('../middlewares/authenticate')
const RequestController = require('../controllers/requests')


// router.get('/', auth, UserController.getAll)

router.post('/', auth, RequestController.addRequest)

// router.get('/profile/:userId', auth, UserController.getProfile)

// router.post('/sign-in', UserController.signIn)

module.exports = router