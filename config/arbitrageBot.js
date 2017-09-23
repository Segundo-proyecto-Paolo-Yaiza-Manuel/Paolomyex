const User = require("../models/User")
const Wallet = require("../models/Wallet")
const Trade = require("../models/Trade")
const superagent = require('superagent')

module.exports = function(){
  const valuesArray = []
  const t1 = superagent.get('https://www.bitstamp.net/api/ticker')
    .then(ticker => {
      valuesArray.push({exchange: 'Bitstamp', BTCValue: ticker.body.last})
    })
    .catch(err => console.log(err))

  const t2 = superagent.get('https://api.bitfinex.com/v2/ticker/tBTCUSD')
    .then(ticker => {
      valuesArray.push({exchange: 'Bitfinex', BTCValue: ticker.body[6]})
    })
    .catch(err => console.log(err))

  let cheapestExchange
  let mostExpensiveExchange

  Promise.all([t1, t2])
    .then(() => {
      const orderedValuesArray = valuesArray.sort( (a, b) => { return a.BTCValue - b.BTCValue })
      cheapestExchange = orderedValuesArray[0]
      mostExpensiveExchange = orderedValuesArray[orderedValuesArray.length -1 ]
      console.log(`Cheapest BTC = ${cheapestExchange.BTCValue} at ${cheapestExchange.exchange}`)
      console.log(`Most expensive BTC = ${mostExpensiveExchange.BTCValue} at ${mostExpensiveExchange.exchange}`)

      User.find({ inArbitrage: true })
      .then(usersInArbitrage => {
        usersInArbitrage.forEach( user => {
          Wallet.find({
            "ownerId": user._id,
            "exchangeSite": {"$in":
            [cheapestExchange.exchange, mostExpensiveExchange.exchange]}
          })
           .then(wallets => {
             if(wallets.length == 2){
               if(wallets[0].exchangeSite == mostExpensiveExchange.exchange && wallets[0].quantity > 0){
                 changeTheWalletOfBTC(wallets[0], wallets[1], mostExpensiveExchange, cheapestExchange, user._id)
               }
               if(wallets[1].exchangeSite == mostExpensiveExchange.exchange && wallets[1].quantity > 0){
                 changeTheWalletOfBTC(wallets[1], wallets[0], mostExpensiveExchange, cheapestExchange, user._id)
               }
             }
           })
        })
      })
    })
}

function changeTheWalletOfBTC(originWallet, destinyWallet, mostExpensiveExchange, cheapestExchange, userId){
  const moneyIfStopsArbitrage = originWallet.quantity*mostExpensiveExchange.BTCValue
  new Trade({
    moneyIfStopsArbitrage: moneyIfStopsArbitrage,
    exchangeOrigin: originWallet.exchangeSite,
    exchangeDestination: destinyWallet.exchangeSite,
    userId: userId
  })
   .save()
   .then( trade => {
     console.log(`============NUEVA OPERACION: ${trade}=============`);
     const originWalletAfterTrade = {
       quantity: 0
     }

     const destinyWalletAfterTrade = {
       quantity: (originWallet.quantity*mostExpensiveExchange.BTCValue)/cheapestExchange.BTCValue
     }

     Wallet.findByIdAndUpdate(originWallet._id, originWalletAfterTrade)
     Wallet.findByIdAndUpdate(destinyWallet._id, destinyWalletAfterTrade)
   })
   .catch(err => console.log(err))
}
