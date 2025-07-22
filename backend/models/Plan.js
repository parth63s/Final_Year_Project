// models/Plan.js
const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  lunch: String,
  dinner: String,
});

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["Trial", "Weekly", "Monthly"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  
  mealsPerDay: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },  
  features: [String],
  support: {
    type: Boolean,
    default: false,
  },
  imageUrls: {
    type: [String],
    validate: [arrayLimit, 'Exactly 4 images are required'],
    required: true,
  },
  menu: [menuSchema],
  // desrciption: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  subscriptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
    required: true,
  }],
}, {
  timestamps: true,
});

function arrayLimit(val) {
  return val.length === 4;
}

module.exports = mongoose.model("Plan", planSchema);
