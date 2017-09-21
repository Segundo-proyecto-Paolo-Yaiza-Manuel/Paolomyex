const gdaxAPI = new GDAXHandler("https://api-public.sandbox.gdax.com")
const bitfinexAPI = new BitfinexHandler("https://api.bitfinex.com")

$(document).ready( () => {

  $('#select-currency').on('change', (e) => {
    const market = $('#select-currency').val()
    gdaxAPI.getTicker(market)
      .then(ticker => $('#market-values').append(displayMarketValue(`In GDAX the BTC value is ${ticker.price}`)))
      .catch(err => console.log(err))
    bitfinexAPI.getTicker(market)
      .then(ticker => $('#market-values').append(displayMarketValue(`In Bitfinex the BTC value is ${ticker[6]}`)))
      .catch(err => console.log(err))
  })
})

function displayMarketValue(infoMarket){
  return $('<p>').text(infoMarket)
}
