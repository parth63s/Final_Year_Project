const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  phone: String,
  address: String,
});

module.exports = mongoose.model('User', userSchema);
