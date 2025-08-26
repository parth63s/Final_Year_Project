const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  kitchenName:String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  phone: String,
  address: String,
  city: String,
  country: String,
  profilePicture: String,

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
