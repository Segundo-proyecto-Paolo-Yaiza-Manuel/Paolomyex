const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const walletSchema = new Schema({
  name: String,
  exchangeSite: String,
  currency: String,
  quantity: Number,
  ownerId: {type: Schema.Types.ObjectId, ref:'User'}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})


module.exports = mongoose.model('Wallet', walletSchema)
