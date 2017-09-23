const User = require("../models/User")
const Wallet = require('../models/Wallet')
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
    const walletOwnerId = req.user._id
    Wallet.find({ownerId: walletOwnerId})
    .then( wallet  => {
      res.render('home', {wallet})
    }).catch( err => next(err))
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
    res.render('users/showuser')
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
    const exchange = req.body.exchange
    console.log(`EXCHANGE: ${exchange}`);
    const BTCPrice = req.body.BTCValue
    console.log(`BTC Value: ${BTCPrice}`);
    const userId = req.user._id
    const userInfo = {
      inArbitrage: true,
      money: 0
    }

    User.findById(userId)
      .then(user =>
        Wallet.findOneAndUpdate({ownerId: user._id, exchangeSite: 'Bitfinex'},
          {quantity: user.money/BTCPrice}, { new: true })
          .then(wallet => console.log(`Init arbitrage with ${wallet.quantity} BTC`)))
    User.findByIdAndUpdate(userId, userInfo, { new: true }, (err, theUser) => {
      if (err) return next(err)

      req.user = theUser
      console.log(theUser);
      res.redirect('/')
    })
  },



  stopArbitragePost:(req, res) => {
    console.log('PARA EL ARBITRAJE');
    console.log(req.body);
    const exchange = req.body.exchange
    console.log(`EXCHANGE: ${exchange}`);
    const BTCPrice = req.body.BTCValue
    console.log(`BTC Value: ${BTCPrice}`);
    const userId = req.user._id
    const userInfo = {
      inArbitrage: false,
      money: 0
    }

    User.findById(userId)
      .then(user =>
        Wallet.findOneAndUpdate({ownerId: user._id, exchangeSite: 'Bitfinex'},
          {quantity: user.money/BTCPrice}, { new: true })
          .then(wallet => console.log(`Init arbitrage with ${wallet.quantity} BTC`)))
    User.findByIdAndUpdate(userId, userInfo, { new: true }, (err, theUser) => {
      if (err) return next(err)

      req.user = theUser
      console.log(theUser);
      res.redirect('/')
    })
  },
}
