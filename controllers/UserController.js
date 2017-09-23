const User = require("../models/User")
const bcrypt = require("bcrypt")

module.exports = {
  addMoneyToAccount: (req, res) => {
    const userId = req.user._id
    const cardInfo = {
      cardNumber: req.body.cardNumber,
      cardCVV: req.body.cvv,
      cardExpiredDate: req.body.expiredDate,
      money: req.body.quantity
    }

    User.findByIdAndUpdate(userId, cardInfo, { new: true }, (err, theUser) => {
      if (err) return next(err)

      req.user = theUser

      res.redirect('/users/home')
    })
  },


  goHomeGet: (req, res) => {
    res.render('home')
  },


  editUserGet: (req, res) => {
    res.render('users/edit')
  },

  editUserPost: (req, res, next) => {
    const userId = req.user._id
    const hashPass = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
    const userInfo = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      address: req.body.address,
      dniNumber: req.body.username,
      phone: req.body.phoneNumber,
      email: req.body.email,
      password: hashPass
      // cardNumber: req.body.cardNumber,
      // cardCVV: req.body.cvv,
      // cardExpiredDate: req.body.expiredDate,
      // money: req.body.quantity
    }

    User.findByIdAndUpdate(userId, userInfo, { new: true }, (err, theUser) => {
      if (err) return next(err)

      req.user = theUser

      res.redirect('/')
    })
  },

  showUserGet: (req, res) => {
    res.render('users/showuser', {

    })
  },

  userDeleteGet: (req, res) => {
    const userId = res.locals.user._id
    User.findByIdAndRemove(userId, (err, user) => {
      if (err){ return next(err) }
      res.redirect('/')
    })
  },

  initArbitrageGet:(req, res) => {
    res.render('wallets/new')
  },

  initArbitragePost:(req, res) => {
    console.log('INICIA EL ARBITRAJE');
    console.log(req.body);
    const userId = req.user._id
    const userInfo = {
      inArbitrage: true
    }
    User.findByIdAndUpdate(userId, userInfo, { new: true }, (err, theUser) => {
      if (err) return next(err)

      req.user = theUser
      res.redirect('/')
    })
  },

  stopArbitrageGet:(req, res) => {
    res.render('wallets/show')
  },

  stopArbitragePost:(req, res) => {
    console.log('PARA EL ARBITRAJE');
    console.log(req.body);
    const userId = req.user._id
    const userInfo = {
      inArbitrage: false
    }
    User.findByIdAndUpdate(userId, userInfo, { new: true }, (err, theUser) => {
      if (err) return next(err)

      req.user = theUser
      res.redirect('/')
    })
  }
}
