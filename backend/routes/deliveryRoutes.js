const express = require("express");
const router = express.Router();
const Delivery = require("../models/delivery");
const Subscription = require("../models/Subscription");
const { startOfDay, endOfDay } = require("date-fns");
// Create deliveries for ALL active subscriptions for today
router.post("/create-today-for-all", async (req, res) => {
  try {
    const today = new Date();

    // 1️⃣ Fetch all active subscriptions
    const subscriptions = await Subscription.find({
      startDate: { $lte: endOfDay(today) },
      endDate: { $gte: startOfDay(today) }
    });

    if (!subscriptions.length) {
      return res.json({ message: "No active subscriptions found" });
    }

    let createdDeliveries = [];
    let skippedDeliveries = [];
    let error = [];

    // 2️⃣ Loop through subscriptions
    for (const sub of subscriptions) {
      try {
        // 💡 Create delivery for Lunch Slot
        if (sub.lunchSlot) {
          const existingLunch = await Delivery.findOne({
            subscriptionId: sub._id,
            deliveryDate: { $gte: startOfDay(today), $lte: endOfDay(today) },
            slotType: "lunch"
          }).populate("subscriptionId");

          if (!existingLunch) {
            const lunchDelivery = await Delivery.create({
              subscriptionId: sub._id,
              deliveryDate: today,
              slotType: "lunch",
              status: "start_delivery",
              slotTime: sub.lunchSlot,
              statusHistory: [{ status: "start_delivery" }]
            });
            createdDeliveries.push(lunchDelivery);
          } else {
            skippedDeliveries.push({ subId: sub._id, slotType: "lunch" });
          }
        }

        // 💡 Create delivery for Dinner Slot
        if (sub.dinnerSlot) {
          const existingDinner = await Delivery.findOne({
            subscriptionId: sub._id,
            deliveryDate: { $gte: startOfDay(today), $lte: endOfDay(today) },
            slotType: "dinner"
          });

          if (!existingDinner) {
            const dinnerDelivery = await Delivery.create({
              subscriptionId: sub._id,
              deliveryDate: today,
              slotType: "dinner",
              status: "start_delivery",
              slotTime: sub.dinnerSlot,
              statusHistory: [{ status: "start_delivery" }]
            });
            createdDeliveries.push(dinnerDelivery);
          } else {
            skippedDeliveries.push({ subId: sub._id, slotType: "dinner" });
          }
        }
      } catch (err) {
        error.push({ subscriptionId: sub._id, message: err.message });
      }
    }

    res.json({
      message: "Daily delivery creation completed",
      createdCount: createdDeliveries.length,
      skippedCount: skippedDeliveries.length,
      createdDeliveries,
      skippedDeliveries,
      error
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.get("/today", async (req, res) => {
  try {
    const today = new Date();
    const deliveries = await Delivery.find({
            deliveryDate: { $gte: startOfDay(today), $lte: endOfDay(today) }
            }).populate({
                path: "subscriptionId",
                populate: [
                    {
                    path: "plan",
                    model: "Plan",
                    populate: { path: "user", model: "User" } // user inside plan
                    },
                    { path: "user", model: "User" } // user directly in subscription
                ]
            });
    console.log(deliveries)

    res.json(
    //   message: "Today's deliveries fetched successfully",
      deliveries
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const isWithinDeliveryWindow = (slot) => {
  if (!slot) return false;
  const [startTime, endTime] = slot.split(" - ");
  const now = new Date();
  const today = now.toDateString();
  const startDate = new Date(`${today} ${startTime}`);
  const endDate = new Date(`${today} ${endTime}`);
  return now >= startDate && now <= endDate;
};


router.get("/today-stats", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const deliveries = await Delivery.find({
      deliveryDate: { $gte: today, $lt: tomorrow }
    })
      .populate({
        path: "subscriptionId",
        populate: [
          { path: "plan" }, // Plan details (type: Trial, Weekly, Monthly)
          { path: "user" }  // User details
        ]
      });

    // Count stats
    let completed = 0, pending = 0, delayed = 0;
    let active = 0;
    let routes = {};
    let subscriptionTypes = {"Trial":0,"Weekly":0,"Monthly":0};
    console.log("Today's deliveries:", deliveries);
    deliveries.forEach(delivery => {
      if (delivery.status === "delivered") completed++;
      else if (delivery.status === "pending" || delivery.status === "start_delivery") pending++;
      else if (delivery.status === "delayed") delayed++;

      // Group by route
      if(isWithinDeliveryWindow(delivery.slotTime)) {
        active++;
      }

      // Group by subscription type
      const planType = delivery.subscriptionId?.plan?.name || "Unknown";
      subscriptionTypes[planType] = (subscriptionTypes[planType] || 0) + 1;
    });

    const total = deliveries.length;
    const efficiency = total ? Math.round((completed / total) * 100) : 0;

    res.json({
      today: { total, completed, pending, delayed, efficiency },
      active,
      subscriptionTypes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


router.put("/mark-delivered/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) return res.status(404).json({ message: "Delivery not found" });

    // prevent double updates
    if (delivery.status === "delivered") {
      return res.status(400).json({ message: "Already delivered" });
    }

    delivery.status = "delivered";
    await delivery.save();

    res.json({ message: "Delivery marked as delivered", delivery });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start delivery
router.put("/start-delivery/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) return res.status(404).json({ message: "Delivery not found" });

    delivery.status = "pending";
    await delivery.save();

    res.json({ message: "Delivery started", delivery });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
