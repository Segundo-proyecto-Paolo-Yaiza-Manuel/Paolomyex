const cardRoutes = require("express").Router()
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')
const CardController = require("../controllers/CardController")

cardRoutes.get("/new", ensureLoggedIn('/'), CardController.newCardGet)
cardRoutes.post('/new', ensureLoggedIn('/'), CardController.newCardPost)
cardRoutes.get("/edit", ensureLoggedIn('/'), CardController.editCardGet)
cardRoutes.post("/edit", ensureLoggedIn('/'), CardController.editCardPost)
cardRoutes.get("/show", ensureLoggedIn('/'), CardController.showCardGet)
cardRoutes.get("/delete" , ensureLoggedIn('/'), CardController.deleteCardGet)
module.exports = cardRoutes
