const express = require("express");
const router = express.Router();
const Subscription = require("../models/Subscription");
const Plan = require("../models/Plan");

router.get("/active-summary", async (req, res) => {
  try {
    const userId = req.user._id;

    const result = await Subscription.aggregate([
      // Step 1: Join with Plan to get plan name and owner
      {
        $lookup: {
          from: "plans",
          localField: "plan",
          foreignField: "_id",
          as: "planData",
        },
      },
      { $unwind: "$planData" },

      // Step 2: Filter only plans created by current user
      {
        $match: {
          "planData.user": userId,
        },
      },

      // Step 3: Compute adjusted price
      {
        $addFields: {
          adjustedPrice: { $subtract: ["$totalPrice", { $multiply: ["$members", 15] }] }
        },
      },

      // Step 4: Group by plan name
      {
        $group: {
          _id: "$planData.name",
          count: { $sum: 1 },
          totalMembers: { $sum: "$members" },
          averagePrice: { $avg: "$adjustedPrice" }
        },
      },

      // Step 5: Reshape result
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: 1,
          members: "$totalMembers",
          averagePrice: 1,
        },
      },
    ]);

    res.json(result);
  } catch (err) {
    console.error("Error in /active-summary:", err);
    res.status(500).json({ error: "Server Error" });
  }
});


router.get("/daily-summary", async (req, res) => {
  try {
    const userId = req.user._id;

    const dailyData = await Subscription.aggregate([
      {
        $lookup: {
          from: "plans",
          localField: "plan",
          foreignField: "_id",
          as: "planData",
        },
      },
      { $unwind: "$planData" },
      { $match: { "planData.user": userId } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          date: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    const profitData = await Subscription.aggregate([
      {
        $lookup: {
          from: "plans",
          localField: "plan",
          foreignField: "_id",
          as: "planData",
        },
      },
      { $unwind: "$planData" },
      { $match: { "planData.user": userId } },
      {
        $group: {
          _id: null,
          totalProfit: {
            $sum: {
              $subtract: ["$totalPrice", { $multiply: ["$members", 15] }]
            }
          },
          totalMembers: { $sum: "$members" },
          totalSubscriptions: { $sum: 1 }
        },
      }
    ]);

    const summary = {
      dailyData,
      totalProfit: profitData[0]?.totalProfit || 0,
      totalMembers: profitData[0]?.totalMembers || 0,
      totalSubscriptions: profitData[0]?.totalSubscriptions || 0,
    };

    res.json(summary);
  } catch (err) {
    console.error("Daily summary error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
