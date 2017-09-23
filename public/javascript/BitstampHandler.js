//Get ticker solo sirve para BTC, habria que cambiar la URL a https://www.bitstamp.net/api/v2/ticker/{currency_pair}/

class BitstampHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }

  getTicker(market) {
    return $.get(`${this.BASE_URL}/ticker`)
  }
}
