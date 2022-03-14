const express = require('express')
const router = express.Router()
const auth = require('../middlewares/authenticateAdmin')
const attendanceController = require('../controllers/attendances')

router.get('/attendances/day', auth, attendanceController.getAllForDay)
router.get('/attendances/week', auth, attendanceController.getAllForWeek)
router.get('/attendances/fortnight', auth, attendanceController.getAllForFortnight)
router.get('/attendances/month', auth, attendanceController.getAllForMonth)

module.exports = router