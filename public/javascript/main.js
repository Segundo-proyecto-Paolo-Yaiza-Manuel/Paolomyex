const bitstampAPI = new BitstampHandler("https://www.bitstamp.net/api/")
const gdaxAPI = new GDAXHandler("https://api-public.sandbox.gdax.com")
const bitfinexAPI = new BitfinexHandler("https://api.bitfinex.com")


$(document).ready( function() {
  $('.delete-wallet').on('click', function(e){
    const id = $(this).attr('data-id-wallet');
    $.ajax({
      url: `/wallets/delete/${id}`,
      type: 'POST',
    })
    .then(res => {$(e.target).parent().remove()})
  })

  $('#select-currency').on('change', (e) => {
    const market = $('#select-currency').val()
    const valuesArray = []
    // const t1 = gdaxAPI.getTicker(market)
    //   .then(ticker => {
    //     valuesArray.push({exchange: 'GDAX', BTCValue: ticker.price})
    //     $('#market-values').append(displayMarketValue(`In GDAX the BTC value is ${ticker.price}`))
    //   })
    const t1 = bitstampAPI.getTicker()
      .then(ticker => {
        valuesArray.push({exchange: 'Bitstamp', BTCValue: ticker.last})
        $('#market-values').append(displayMarketValue(`In Bitstamp the BTC value is ${ticker.last}`))
      })
      .catch(err => console.log(err))

    const t2 = bitfinexAPI.getTicker(market)
      .then(ticker => {
        valuesArray.push({exchange: 'Bitfinex', BTCValue: ticker[6]})
        $('#market-values').append(displayMarketValue(`In Bitfinex the BTC value is ${ticker[6]}`))
      })
      .catch(err => console.log(err))

    Promise.all([t1, t2])
      .then(() => {
        const orderedValuesArray = valuesArray.sort( (a, b) => { return a.BTCValue - b.BTCValue })
        displayCheapestOption($('#market-values'), $('#market-values-btns'), orderedValuesArray[0])
      })
  })

  $('#init-arbitrage').on('click', (e) => {
    e.preventDefault()
    $.ajax({
      method:  'POST',
      url:     `/users/init-arbitrage`,
      dataType:'json',
      data:    {exchange: $('#init-arbitrage').attr('data-exchange'),
                BTCValue: $('#init-arbitrage').attr('data-value')}
    })
    .then(()=>console.log('ENVIADO'))
    .catch((e)=>console.log(e))
  })

  $('#stop-arbitrage').on('click', (e) => {
    e.preventDefault()
    $.ajax({
      method:  'POST',
      url:     `/users/stop-arbitrage`,
      dataType:'json',
    })
    .then(()=>console.log('DETENIDO'))
    .catch((e)=>console.log(e))
  })


})

function displayMarketValue(infoMarket){
  return $('<p>').text(infoMarket)
}

function displayCheapestOption($parentText, $parentBtns, cheapestOption){
  const $cheapestOptionText =  $('<p>').text(`The cheapest option is to buy in ${cheapestOption.exchange}`)
  const $maybeLaterBtn = $('<a>').attr('href', '/users/home').text(`Maybe later`)

  $parentText.append($cheapestOptionText)
  $parentBtns.append($maybeLaterBtn)
  $('#init-arbitrage')
  .attr('data-exchange', `${cheapestOption.exchange}`)
  .attr('data-value', `${cheapestOption.BTCValue}`)
  .text(`Initialize arbitrage with ${cheapestOption.exchange}`).show()
  $('#stop-arbitrage')
  .attr('data-exchange', `${cheapestOption.exchange}`)
  .attr('data-value', `${cheapestOption.BTCValue}`)
  .text(`Stop arbitrage with ${cheapestOption.exchange}`).show()

}
