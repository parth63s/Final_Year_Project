// backend/routes/foodRoutes.js
const express = require("express");
const router = express.Router();
const Plan = require("../models/Plan");

// @route   GET /api/foods
// @desc    Get all food items
router.get("/", async (req, res) => {
  try {
    const plans = await Plan.find().populate(['user', 'reviews']); // Optional: populate user info
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch food items", error });
  }
});

// GET one service provider (by ID)
router.get("/:id", async (req, res) => {
  try {
    const planItem = await Plan.findById(req.params.id).populate(["user","reviews"]);
    if (!planItem) return res.status(404).json({ message: "Not found" });
    res.status(200).json(planItem);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
});

module.exports = router;
