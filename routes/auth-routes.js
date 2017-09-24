const express = require("express")
const authRoutes = express.Router()
const passport = require("passport")
const bcrypt = require("bcrypt")
const bcryptSalt = 10
const ensureLogin = require("connect-ensure-login")
const multer = require('multer');
const AuthController = require("../controllers/AuthController")
const User = require("../models/User")
const upload = multer({ dest: './public/uploads/' });

authRoutes.get("/signup", ensureLogin.ensureLoggedOut('/'), AuthController.signup)
authRoutes.post('/signup', upload.fields([{
  name:'dniFront'}, {name:'dniBack'}]), passport.authenticate('local-signup', {
  successRedirect : '/wallets/create',
  failureRedirect : '/signup'
}))

authRoutes.get('/login',ensureLogin.ensureLoggedOut('/'), AuthController.login)
authRoutes.post('/login', passport.authenticate('local-login', {
  successRedirect : '/users/home',
  failureRedirect : '/login'
}))


authRoutes.post("/logout", AuthController.logout)

module.exports = authRoutes
