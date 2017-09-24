const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  address: String,
  dniNumber: String,
  imgDniFront: String,
  imgDniBack: String,
  phone: String,
  password: String,
  email: String,
  cardNumber: Number,
  cardCVV: Number,
  cardExpiredDate: Date,
  money: Number,
  inArbitrage: {type:Boolean, default:false},
  lastBTCValue: {type:Number, default:0}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})


module.exports = mongoose.model('User', userSchema)
