class GDAXHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }

  getTicker(market) {
    return $.get(`${this.BASE_URL}/products/${market}/ticker`)
  }
}
