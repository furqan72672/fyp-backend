const express = require('express')
const router = express.Router()
const manager = require('../middlewares/authenticateManager')
const auth = require('../middlewares/authenticate')
const SalesController = require('../controllers/sales')


router.get('/', manager, SalesController.getAllForManager)

router.post('/', auth, SalesController.addSale)

// router.get('/profile/:userId', auth, UserController.getProfile)

// router.post('/sign-in', UserController.signIn)

module.exports = router