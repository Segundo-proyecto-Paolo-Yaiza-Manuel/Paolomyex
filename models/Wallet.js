const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const walletSchema = new Schema({
  name: String,
  exchangeSite: {
    type: String,
    enum: [
      'Poloniex',
      'Bittrex',
      'Kraken'
    ]
  },
  currency: {
    type: String,
    enum: [
      'BTC'
    ]
  },
  quantity: Number,
  ownerId: {type: Schema.Types.ObjectId, ref:'User'}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})


module.exports = mongoose.model('Wallet', walletSchema)
