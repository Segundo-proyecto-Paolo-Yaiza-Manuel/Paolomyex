const gdaxAPI = new GDAXHandler("https://api-public.sandbox.gdax.com")

$(document).ready( () => {

  $('#select-currency').on('change', (e) => {
    const market = $('#select-currency').val()
    gdaxAPI.getTicker(market)
      .then(ticker => $('#market-values').append(displayMarketValue(`GDAX`, market, ticker)))
      .catch(err => console.log(err))
  })
})

function displayMarketValue(exchange, market, ticker){
  return $('<p>').text(`In ${exchange} the ${market} value is ${ticker.price}`)
}
