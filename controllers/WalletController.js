const Wallet = require('../models/Wallet')

module.exports = {

  selectExGet: (req, res) => {
    res.render('wallets/create')
  },

  createWalletGet: (req, res) => {
    res.render('wallets/show')
  },

  createWalletPost: (req, res) => {
    const GDAXClicked = req.body.exchangeGDAX
    if(GDAXClicked == 'on')
      new Wallet({
        exchangeSite: 'GDAX'
      })
      .save()
      .then(()=> console.log('WALLET CREADA'))

    res.redirect('/wallets/selectexchange')
  },

  initArbitrageGet:(req, res) => {
    res.render('wallets/new')
  },

  initArbitragePost:(req, res) => {
    console.log('INICIA EL ARBITRAJE');
    console.log(req.body);
  }
}
