const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Plan = require('../models/Plan');

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ msg: "Unauthorized" });
};

router.post('/:foodId', isAuthenticated, async (req, res) => {
  try {
    const { rating, feedback, tags, imageUrl } = req.body;

    // Get the user from session or JWT (mock for now)
    const user = req.user._id || "662b15e8c8e5cdee20534a99";
    console.log(req.user); // replace or secure this in prod

    // Create and save review
    const review = new Review({
      plan: req.params.foodId,
      user: user,
      rating,
      feedback,
      tags,
      imageUrl,
    });

    const savedReview = await review.save();

    // Push review into related Food document
    await Plan.findByIdAndUpdate(req.params.foodId, {
      $push: { reviews: savedReview._id }
    });

    res.status(201).json(savedReview);
  } catch (error) {
    console.error("Error posting review:", error);
    res.status(500).json({ message: 'Failed to post review', error: error.message });
  }
});

// In routes/review.js
router.get('/:foodId', async (req, res) => {
  try {
    const reviews = await Review.find({ plan: req.params.foodId }).populate('user').populate('plan');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
});

router.get('/',isAuthenticated, async (req, res) => {
  try {
    const user = req.user._id;
    const plans = await Plan.find({ user: user })
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          select: 'name email', // optional: select only name/email
        }
    })
    .populate('user'); // this is the plan owner

    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
});

// router.get('/rating', async (req, res) => {
//   try {
//     const reviews = await E
//   }
// })

module.exports = router;
