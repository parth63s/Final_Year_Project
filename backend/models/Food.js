const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // name: String,
  rating: Number,
  // imageUrls: [String],
  plans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plan' }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});


module.exports = mongoose.model('Food', FoodSchema);