const mongoose = require("mongoose");

const DeliverySchema = new mongoose.Schema({
  subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
  deliveryDate: { type: Date, required: true },
  // planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
  slotType: { type: String, enum: ["lunch", "dinner"], required: true },
  status: {
    type: String,
    enum: ["pending", "start_delivery", "delivered", "cancelled"],
    default: "start_delivery"
  },
  statusHistory: [
    {
      status: String,
      updatedAt: { type: Date, default: Date.now }
    }
  ],
  slotTime: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Delivery", DeliverySchema);
