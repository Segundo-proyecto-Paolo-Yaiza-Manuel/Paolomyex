const router = require('express').Router()
const userController = require('../controllers/UserController')

router.get('/edit', userController.editUserGet)
router.post('/edit', userController.editUserPost)
router.get('/addMoneyToAccount',userController.addMoneyGet)
router.post('/addMoneyToAccount', userController.addMoneyToAccount)
router.get('/home', userController.goHomeGet)
router.get('/userinfo', userController.showUserGet)
router.get('/delete', userController.userDeleteGet)
router.get('/init-arbitrage', userController.initArbitrageGet)
router.post('/init-arbitrage', userController.initArbitragePost)
router.post('/stop-arbitrage', userController.stopArbitragePost)
router.get('/trades-info', userController.tradesInfoGet)



module.exports = router
