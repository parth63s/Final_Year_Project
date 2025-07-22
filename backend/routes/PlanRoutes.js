// routes/planRoutes.js
const express = require("express");
const router = express.Router();
const Plan = require("../models/Plan");

// Auth middleware (Passport or your custom)
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ msg: "Unauthorized" });
};

router.post("/add", isAuthenticated, async (req, res) => {
  try {
    const newPlan = new Plan({
      ...req.body,
      user: req.user._id, // from passport session
    });

    const savedPlan = await newPlan.save();
    res.json({ success: true, plan: savedPlan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to save plan" });
  }
});

router.get("/user", isAuthenticated, async (req, res) => {
  try {
    const plans = await Plan.find({ user: req.user._id });
    res.json({ success: true, plans });
  } catch (error) {
    console.error("Error fetching user plans:", error);
    res.status(500).json({ success: false, message: "Failed to fetch plans" });
  }
});


module.exports = router;
