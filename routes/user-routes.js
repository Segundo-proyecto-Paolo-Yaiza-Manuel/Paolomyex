const router = require('express').Router()
const userController = require('../controllers/UserController')

router.get('/edit', userController.editUserGet)
router.get('/edit', userController.editUserPost)
router.post('/addMoneyToAccount', userController.addMoneyToAccount)

module.exports = router
