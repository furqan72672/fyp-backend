const express = require('express')
const router = express.Router()
const auth = require('../middlewares/authenticate')
const AttendanceController = require('../controllers/attendances')


router.post('/', auth, AttendanceController.markAttendance)
router.get('/today', auth, AttendanceController.getToday)

module.exports = router