const Wallet = require('../models/Wallet')

module.exports = {

selectExGet: (req, res) => {
  res.render('wallets/create')
},

createWalletPost: (req, res) => {
  const GDAXClicked = req.body.exchangeGDAX
  if(GDAXClicked == 'on')
    new Wallet({
      name: 'GDAX',
      exchangeSite: 'GDAX',
      currency: 'BTC',
        ownerId: res.locals.user._id
    })
    .save()
    .then(()=> console.log('WALLET GDAX CREADA'))
  const BitfinexClicked = req.body.exchangeBitfinex
  if(BitfinexClicked == 'on')
  new Wallet({
      name: 'Bitfinex',
      exchangeSite: 'Bitfinex',
      currency: 'BTC',
      ownerId: res.locals.user._id
    })
    .save()
    .then(()=> console.log('WALLET BITFINEX CREADA'))


  res.redirect('/wallets/selectexchange')
},

createWalletGet: (req, res) => {
  Wallet.find({}, (err, wallets) => {
    if (err) { return next(err); }


  res.render('wallets/show', {
      title:'My Wallets',
      wallets: wallets
    })
  })
}

}
