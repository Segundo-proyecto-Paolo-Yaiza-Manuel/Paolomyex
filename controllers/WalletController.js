const User = require ('../models/User')

module.exports = {
  newWalletGet: (req, res) => {
    res.render("wallets/new")
  },
  newWalletPost: (req, res) => {
    res.render('/')
  },

  editWalletGet: (req, res) => {
    res.render('wallets/edit-wallet')
  },

  editWalletPost: (req, res) => {
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

      res.redirect('/')
    })
  },

  showWalletGet: (req, res) => {
    res.render('wallets/show')
  },

  showWalletPost: (req, res) => {
    res.render('/')
  },

  deleteWalletGet: (req, res) => {
    const userId = req.user._id
    const cardInfo = {
      cardNumber: "",
      cardCVV: "",
      cardExpiredDate:"",
      money: ""
    }

    User.findByIdAndUpdate(userId, cardInfo, { new: true }, (err, theUser) => {
      if (err) return next(err)

      req.user = theUser

      res.redirect('/')
    })
  },


}
