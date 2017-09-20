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

      res.redirect('/')
    })
  },

  editUserGet: (req, res) => {
    res.render('users/edit')
  },

  goHome: (req, res) => {
    res.render('home')
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
  }
}
