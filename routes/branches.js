const express = require('express')
const router = express.Router()
const auth = require('../middlewares/authenticate')
const BranchController = require('../controllers/branches')


router.get('/:id', auth, BranchController.getUserBranch)

// router.post('/signup', UserController.signUp)

// router.get('/profile/:userId', auth, UserController.getProfile)

// router.post('/sign-in', UserController.signIn)

module.exports = router