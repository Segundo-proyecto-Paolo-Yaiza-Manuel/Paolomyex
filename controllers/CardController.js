const User = require ('../models/User')

module.exports = {
  newCardGet: (req, res) => {
    res.render("card/new")
  },


  newCardPost: (req, res) => {
    res.render('/')
  },

  editCardGet: (req, res) => {
    res.render('card/edit-card')
  },

  editCardPost: (req, res) => {
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

  showCardGet: (req, res) => {
    res.render('card/show')
  },

  showCardPost: (req, res) => {
    res.render('/')
  },

  deleteCardGet: (req, res) => {
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
