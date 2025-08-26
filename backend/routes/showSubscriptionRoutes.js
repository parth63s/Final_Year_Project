const express = require("express");
const router = express.Router();
const Subscription = require("../models/Subscription");
const Plan = require("../models/Plan");

// ========== CUSTOMER: Get subscriptions for logged-in user ==========
router.get("/user", async (req, res) => {
  try {
    const userId = req.user._id;

    const subscriptions = await Subscription.find({ user: userId })
        .populate("user", "name email phone") // customer
        .populate({
            path: "plan",
            populate: {
                path: "user", // inside plan populate user also
                select: "name email phone"
            }
        });
    res.json(subscriptions);
  } catch (err) {
    console.error("Error fetching user subscriptions:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ========== SERVICE PROVIDER: Get subscriptions for their plans ==========
router.get("/service", async (req, res) => {
  try {
    const serviceId = req.user._id;

    // 1. Find all plans created by this service provider
    const plans = await Plan.find({ user: serviceId });
    const planIds = plans.map((p) => p._id);

    // 2. Find subscriptions linked to those plans
    const subscriptions = await Subscription.find({ plan: { $in: planIds } })
      .populate("plan") // plan info
      .populate("user", "name email phone"); // customer info

    res.json(subscriptions);
  } catch (err) {
    console.error("Error fetching service subscriptions:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
