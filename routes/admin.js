const express = require('express')
const router = express.Router()
const auth = require('../middlewares/authenticateAdmin')
const adminController = require('../controllers/admin')


router.get('/sales', auth, adminController.getAllSales)
router.get('/sales/:id', auth, adminController.getOneSale)


router.get('/users', auth, adminController.getAllUsers)
router.get('/users/:id', auth, adminController.getOneUser)


router.get('/settings', auth, adminController.getAdminData)
// router.get('/users/:id', auth, adminController.updateAdminData)


router.get('/stocks', auth, adminController.getAllStocks)
router.get('/stocks/:id', auth, adminController.getOneStock)
router.post('/stocks', auth, adminController.addStock)
router.patch('/stocks/:id', auth, adminController.updateStock)
router.delete('/stocks/:id', auth, adminController.deleteStock)


router.get('/products', auth, adminController.getAllProducts)
router.get('/products/:id', auth, adminController.getOneProduct)
router.post('/products', auth, adminController.addProduct)
router.patch('/products/:id', auth, adminController.updateProduct)
router.delete('/products/:id', auth, adminController.deleteProduct)


router.get('/attendances/day', auth, adminController.attendanceForDay)
router.get('/attendances/week', auth, adminController.attendanceForWeek)
router.get('/attendances/fortnight', auth, adminController.attendanceForFortnight)
router.get('/attendances/month', auth, adminController.attendanceForMonth)

module.exports = router





