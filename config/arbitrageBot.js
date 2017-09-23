const User = require("../models/User")
const Wallet = require("../models/Wallet")
const superagent = require('superagent')

module.exports = function(){
  const valuesArray = []
  const t1 = superagent.get('https://api-public.sandbox.gdax.com/products/BTC-USD/ticker')
    .then(ticker => {
      valuesArray.push({exchange: 'GDAX', BTCValue: ticker.body.price})
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
    })

  User.find({ inArbitrage: true })
    .then(usersInArbitrage => usersInArbitrage.forEach( user => {
      Wallet.find({ownerId: user._id,
                  $or: [ {exchangeSite: cheapestExchange.exchange},
                    { $and: [{exchangeSite: mostExpensiveExchange.exchange}, {quantity: { $gt: 0}} ] }]})
        .then(wallets => console.log(`====${wallets[0]} ===== ${wallets[1]}$===`))
      console.log(`====${user.firstname} is doing arbitrage with ${user.money}$===`)
    }))
}
