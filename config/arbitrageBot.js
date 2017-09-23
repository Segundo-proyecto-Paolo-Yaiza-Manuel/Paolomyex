const User = require("../models/User")
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
      // console.log(ticker);
      valuesArray.push({exchange: 'Bitfinex', BTCValue: ticker.body[6]})
    })
    .catch(err => console.log(err))

  Promise.all([t1, t2])
    .then(() => {
      const orderedValuesArray = valuesArray.sort( (a, b) => { return a.BTCValue - b.BTCValue })
      console.log(orderedValuesArray);
      console.log(`Cheapest BTC = ${orderedValuesArray[0].BTCValue} at ${orderedValuesArray[0].exchange}`)
      console.log(`Most expensive BTC = ${orderedValuesArray[orderedValuesArray.length -1 ].BTCValue} at ${orderedValuesArray[orderedValuesArray.length -1 ].exchange}`)
    })

  User.find({ inArbitrage: true })
    .then(usersInArbitrage => usersInArbitrage.forEach( user => {
      console.log(`====${user.firstname} is doing arbitrage with ${user.money}$===`)
    }))
}
