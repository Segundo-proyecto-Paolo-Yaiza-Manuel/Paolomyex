const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const tradeSchema = new Schema({
  moneyIfStopsArbitrage: Number,
  exchangeOrigin: String,
  exchangeDestination: String,
  userId: {type: Schema.Types.ObjectId, ref:'User'}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})


module.exports = mongoose.model('Trade', tradeSchema)
