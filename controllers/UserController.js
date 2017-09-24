const User = require("../models/User")
const Wallet = require("../models/Wallet")
const Trade = require("../models/Trade")
const bcrypt = require("bcrypt")

module.exports = {
  addMoneyToAccount: (req, res) => {
    console.log('holi')
    const userId = req.user._id
    const cardInfo = {
      cardNumber: req.body.cardNumber,
      cardCVV: req.body.cvv,
      cardExpiredDate: req.body.expiredDate,
      money: req.body.quantity
    }

    User.findByIdAndUpdate(userId, cardInfo, {new: true})
      .then(result => {
        req.user = result
        res.redirect('/users/home')
      })
      .catch(err => console.log(err))
  },

  addMoneyGet: (req, res) => {
    res.render('users/addMoneyToAccount')
  },

  goHomeGet: (req, res) => {
    const userId = req.user._id
    Wallet.find({ownerId: userId})
    .then( wallets  => {res.render('home', {wallets: wallets})})
    .catch( err => next(err))
  },


  editUserGet: (req, res) => {
    res.render('users/edit')
  },

  editUserPost: (req, res, next) => {
    const userId = req.user._id

    const userInfo = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      address: req.body.address,
      dniNumber: req.body.username,
      phone: req.body.phoneNumber,
      email: req.body.email
    }

console.log(userInfo);

    User.findByIdAndUpdate(userId, userInfo, {new: true})
      .then(newUser => {
        req.user = newUser
        res.redirect('/')
      })
      .catch(err => next(err))
  },

  showUserGet: (req, res) => {
    res.render('users/showuser')
  },

  userDeleteGet: (req, res) => {
    const userId = res.locals.user._id
    User.findByIdAndRemove(userId, (err, user) => {
      if (err) {
        return next(err)
      }
      res.redirect('/')
    })
  },

  initArbitrageGet: (req, res) => {
    res.render('wallets/new')
  },

  initArbitragePost: (req, res) => {
    console.log('INICIA EL ARBITRAJE');
    const exchange = req.body.exchange
    const BTCPrice = req.body.BTCValue
    const userId = req.user._id
    const userInfo = {
      inArbitrage: true,
      money: 0,
      lastBTCValue: req.body.BTCValue
    }

    const userMoney = req.user.money
    const walletBTCQuantity = userMoney / BTCPrice
    const walletInfo = {
      quantity: walletBTCQuantity
    }

    Wallet.findOneAndUpdate({
          'ownerId': req.user._id,
          'exchangeSite': exchange
        },
        walletInfo, {
          new: true
        })
      .then(wallet => console.log(`Init arbitrage with ${wallet.quantity} BTC`))
      .catch(error => {
        console.log(error)
      })
    User.findByIdAndUpdate(userId, userInfo, {
      new: true
    }, (err, theUser) => {
      if (err) return next(err)

      req.user = theUser
      console.log(theUser);
      res.redirect('/')
    })
  },



  stopArbitrageGet: (req, res) => {
    const userId = req.user._id
    const userInfo = {
      inArbitrage: false
    }

    Wallet.find({ownerId: userId, quantity: {$gt: 0}})
    .then(wallet => {
      console.log(wallet);
      if(wallet.exchangeSite == 'Bitstamp'){
        superagent.get('https://www.bitstamp.net/api/ticker')
          .then(ticker => {
            userInfo.money = wallet.quantity*ticker.body.last

            User.findByIdAndUpdate(userId, userInfo, {new: true})
              .then(newUser => {
                req.user = newUser
                res.redirect('/users/home')
                Wallet.findByIdAndUpdate(wallet._id, {quantity:0})
              })
              .catch(err => console.log(err))

          })
          .catch(err => console.log(err))
      }
      if(wallet.exchangeSite == 'Bitfinex'){
        superagent.get('https://api.bitfinex.com/v2/ticker/tBTCUSD')
          .then(ticker => {
            userInfo.money = wallet.quantity*ticker.body[6]

            User.findByIdAndUpdate(userId, userInfo, {new: true})
              .then(newUser => {
                req.user = newUser
                res.redirect('/users/home')
                Wallet.findByIdAndUpdate(wallet._id, {quantity:0})
              })
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
      }
    })
  },

  tradesInfoGet: (req, res) => {
    const userId = req.user._id
    Trade.find({userId: userId})
    .then(trades => res.status(200).json(trades))
  },

  operationsHistoryGet: (req, res) => {
    const userId = req.user._id
    Trade.find({userId: userId})
    .then(trades => res.render('users/operationsHistory', {trades: trades}))
  }
}
