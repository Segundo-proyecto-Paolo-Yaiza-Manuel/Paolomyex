const Wallet = require('../models/Wallet')

module.exports = {

selectExGet: (req, res) => {
  res.render('wallets/create')
},

createWalletPost: (req, res) => {
  const GDAXClicked = req.body.exchangeBitstamp
  if(GDAXClicked == 'on')
    new Wallet({
      name: 'Bitstamp',
      exchangeSite: 'Bitstamp',
      currency: 'BTC',
      ownerId: res.locals.user._id
    })
    .save()
    .then(()=> console.log('WALLET BITSTAMP CREADA'))
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
},

walletDeletePost: (req, res) => {
const walletId = req.params.id
console.log(walletId)
Wallet.findByIdAndRemove(walletId)
.then( response => {
  res.status(200).json({respuesta: walletId})
}).catch( error => console.log(`8========D ${error}`))


}


}
