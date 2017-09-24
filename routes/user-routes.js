const router = require('express').Router()
const userController = require('../controllers/UserController')
const {ensureLoggedIn} = require('connect-ensure-login')

router.get('/edit', ensureLoggedIn('/'), userController.editUserGet)
router.post('/edit', ensureLoggedIn('/'), userController.editUserPost)
router.get('/addMoneyToAccount', ensureLoggedIn('/'),userController.addMoneyGet)
router.post('/addMoneyToAccount', ensureLoggedIn('/'), userController.addMoneyToAccount)
router.get('/home', ensureLoggedIn('/'), userController.goHomeGet)
router.get('/userinfo', ensureLoggedIn('/'), userController.showUserGet)
router.get('/delete', ensureLoggedIn('/'), userController.userDeleteGet)
router.get('/init-arbitrage', ensureLoggedIn('/'), userController.initArbitrageGet)
router.post('/init-arbitrage', ensureLoggedIn('/'), userController.initArbitragePost)
router.get('/stop-arbitrage', ensureLoggedIn('/'), userController.stopArbitrageGet)
router.get('/trades-info', ensureLoggedIn('/'), userController.tradesInfoGet)
router.get('/operation-history', ensureLoggedIn('/'), userController.operationsHistoryGet)



module.exports = router
