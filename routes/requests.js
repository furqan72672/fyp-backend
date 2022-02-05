const express = require('express')
const router = express.Router()
const auth = require('../middlewares/authenticate')
const manager = require('../middlewares/authenticateManager')
const RequestController = require('../controllers/requests')


router.get('/', manager, RequestController.getAllForManager)

router.post('/', auth, RequestController.addRequest)

// router.get('/profile/:userId', auth, UserController.getProfile)

// router.post('/sign-in', UserController.signIn)

module.exports = router