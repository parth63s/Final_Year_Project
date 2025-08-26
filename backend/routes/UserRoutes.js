const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET /api/user/profile
router.get("/profile", async (req, res) => {
  try {
    // Passport.js already adds req.user
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password"); // exclude password

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
