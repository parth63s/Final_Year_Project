// routes/planRoutes.js
const express = require("express");
const router = express.Router();
const Plan = require("../models/Plan");
const Subscription = require("../models/Subscription");

// Auth middleware (Passport or your custom)
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ msg: "Unauthorized" });
};

// POST /api/subscriptions/subscribe
router.post("/subscribe", isAuthenticated, async (req, res) => {
  const { planId, members, startDate, lunchSlot, dinnerSlot, razorpayPaymentId } = req.body;
  
  const userId = req.user._id;
  
  try {
    const existingSub = await Subscription.findOne({ user: userId, plan: planId }).sort({ endDate: -1 });
    if (existingSub && new Date(existingSub.endDate) >= new Date()) {
      return res.status(400).json({ message: "You already subscribed to this plan."});
    }

    if (new Date(startDate) < new Date().setHours(0, 0, 0, 0)) {
      return res.status(400).json({ message: "StartDate must be today or a future date." });
    }
    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ error: "Plan not found" });

    const totalPrice = plan.price * members;
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + plan.duration);

    const subscription = new Subscription({
      user: userId,
      plan: planId,
      members,
      startDate,
      endDate,
      lunchSlot,
      dinnerSlot,
      totalPrice,
      razorpayPaymentId,
      paymentStatus: "paid",
      delivery:"68ad6b143df0d426341b33cb",
    });

    await subscription.save();
    plan.subscriptions.push(subscription._id);
    await plan.save();
    res.status(201).json({ message: "Subscription created", subscription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
