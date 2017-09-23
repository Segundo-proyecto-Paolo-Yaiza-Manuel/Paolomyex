const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const tradeSchema = new Schema({
  tradeDate: Date,
  quantity: Number,
  exchangeOrigin: {
    type: String,
    enum: [
      'Poloniex',
      'Bittrex',
      'Kraken'
    ]
  },
  
  exchangeDestination: {
    type: String,
    enum: [
      'Poloniex',
      'Bittrex',
      'Kraken'
    ]
  },
  walletId: {type: Schema.Types.ObjectId, ref:'Wallet'}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})


module.exports = mongoose.model('Trade', tradeSchema)
