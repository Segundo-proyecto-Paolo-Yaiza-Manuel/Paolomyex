const router = require('express').Router()
const walletController = require('../controllers/WalletController')

router.get('/create', walletController.selectExGet)
router.post('/create', walletController.createWalletPost)
router.get('/selectexchange', walletController.createWalletGet)


module.exports = router
