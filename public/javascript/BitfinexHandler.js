class BitfinexHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }

  getTicker(market) {
    switch (market) {
      case 'BTC-USD':
        return $.get(`${this.BASE_URL}/v2/ticker/tBTCUSD`)
        break;
      default:

    }

  }
}
