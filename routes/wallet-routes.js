const walletRoutes = require("express").Router()
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')
const WalletController = require("../controllers/WalletController")

walletRoutes.get("/new", ensureLoggedIn('/'), WalletController.newWalletGet)
walletRoutes.post('/new', ensureLoggedIn('/'), WalletController.newWalletPost)
walletRoutes.get("/edit", ensureLoggedIn('/'), WalletController.editWalletGet)
walletRoutes.post("/edit", ensureLoggedIn('/'), WalletController.editWalletPost)
walletRoutes.get("/show", ensureLoggedIn('/'), WalletController.showWalletGet)
walletRoutes.get("/delete" , ensureLoggedIn('/'), WalletController.deleteWalletGet)
module.exports = walletRoutes
