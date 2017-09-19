const walletRoutes = require("express").Router()
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')
const WalletController = require("../controllers/WalletController")

walletRoutes.get("/new", ensureLoggedIn('/'), WalletController.newWalletGet)
walletRoutes.post('/new', ensureLoggedIn('/'), WalletController.newWalletPost)

module.exports = walletRoutes
