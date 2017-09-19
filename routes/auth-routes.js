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

authRoutes.get("/signup", AuthController.signup)
authRoutes.post('/signup', upload.fields([{
  name:'dniFront'}, {name:'dniBack'}]), passport.authenticate('local-signup', {
  successRedirect : '/login',
  failureRedirect : '/signup'
}))

authRoutes.get('/login',ensureLogin.ensureLoggedOut('/'), AuthController.login)
authRoutes.post('/login', passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login'
}))

authRoutes.get("/logout", AuthController.logout)

module.exports = authRoutes
