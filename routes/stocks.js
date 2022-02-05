const express = require('express')
const router = express.Router()
const auth = require('../middlewares/authenticate')
const StockController = require('../controllers/stocks')


router.get('/', auth, StockController.getAllForManager)

router.post('/', auth, StockController.addStock)

// router.post('/signup', UserController.signUp)

// router.get('/profile/:userId', auth, UserController.getProfile)

// router.post('/sign-in', UserController.signIn)

module.exports = router