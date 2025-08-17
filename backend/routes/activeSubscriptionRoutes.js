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


router.get("/", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const subscriptions = await Subscription.find()
      .populate({
          path: "plan",
          populate: {
            path: "user", // populate plan inside user
            model: "User"
          }
      })
      .populate("user");

    // Only keep active ones
    const activeSubs = subscriptions.filter((sub) => {
      const start = new Date(sub.startDate);
      start.setHours(0, 0, 0, 0);

      // If plan.duration exists, compute end date from it
      let end;
      if (sub.plan?.duration) {
        end = new Date(start);
        end.setDate(end.getDate() + sub.plan.duration - 1);
      } else {
        // fallback to stored endDate
        end = new Date(sub.endDate);
      }
      end.setHours(0, 0, 0, 0);

      return today >= start && today <= end;
    });

    res.json(activeSubs);
  } catch (err) {
    console.error("Error fetching subscriptions:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;

















// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import PersonIcon from "@mui/icons-material/Person";
// import PhoneIcon from "@mui/icons-material/Phone";
// import EmailIcon from "@mui/icons-material/Email";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
// import { OnlineStatusContext } from "./OnlineStatusContext";

// const Item = () => {
//   const { isOnline } = useContext(OnlineStatusContext);
//   const [plans, setPlans] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/subscriptions", { withCredentials: true })
//       .then((res) => {
//         const today = new Date().setHours(0, 0, 0, 0);
//         const activePlans = res.data.filter((plan) => {
//           const start = new Date(plan.startDate).setHours(0, 0, 0, 0);
//           const end = new Date(plan.endDate).setHours(0, 0, 0, 0);
//           return today >= start && today <= end;
//         });
//         setPlans(activePlans);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   console.log(plans);

//   const updateDeliveryStatus = (id, mealType) => {
//     setPlans((prevPlans) =>
//       prevPlans.map((plan) =>
//         plan._id === id
//           ? {
//               ...plan,
//               delivery: {
//                 ...plan.delivery,
//                 [mealType]:
//                   plan.delivery[mealType] === "pending"
//                     ? "in_progress"
//                     : "completed",
//               },
//             }
//           : plan
//       )
//     );
//   };

//   return (
//     <div className="container delivery-margin mt-4">
//       {plans.map((plan) => (
//         <div key={plan._id} className="card mb-3 p-3 shadow">
//           <div className="row">
//             {/* Customer */}
//             <div className="col-md-4">
//               <h5>Customer Details</h5>
//               <p className="d-flex delivery-margin-icon">
//                 <p className="p-3 delivery-icon"><PersonIcon /></p>
//                 <div className="m-2 text">{plan.user.name} <br /><small>Customer Name</small></div>
//               </p>
//               <p className="d-flex delivery-margin-icon">
//                 <p className="p-3 delivery-icon"><PhoneIcon /></p>
//                 <div className="m-2 text">{plan.user.phone} <br /><small>Phone</small></div>
//               </p>
//               <p className="d-flex delivery-margin-icon">
//                 <p className="p-3 delivery-icon"><EmailIcon /></p>
//                 <div className="m-2 text">{plan.user.email} <br /><small>Email</small></div>
//               </p>
//               <p className="d-flex delivery-margin-icon">
//                 <p className="p-3 delivery-icon"><LocationOnIcon /></p>
//                 <div className="m-2 text">{plan.user.address} <br /><small>Address</small></div>
//               </p>
//             </div>

//             {/* Schedule */}
//             <div className="col-md-4">
//               <h5>Today's Schedule</h5>
//               <p className="d-flex delivery-margin-icon">
//                 <p className="p-3 delivery-icon"><AccessTimeIcon /></p>
//                 <div className="m-2 text">
//                   Lunch: {plan.lunchSlot} <br />
//                   Dinner: {plan.dinnerSlot}
//                 </div>
//               </p>
//               <p className="d-flex delivery-margin-icon">
//                 <p className="p-3 delivery-icon"><DeliveryDiningIcon /></p>
//                 <div className="m-2 text">{plan.plan.name} <br /><small>{plan.plan.duration} days</small></div>
//               </p>
//             </div>

//             {/* Actions */}
//             <div className="col-md-4 text-center">
//               <h5>Actions</h5>
//               <div className="row mt-3 p-3">
//                 {/* Lunch Button */}
//                 <button
//                   className={`btn btn-primary col m-1 shadow ${!isOnline ? "btn-secondary" : ""}`}
//                   disabled={!isOnline || plan.delivery?.lunch === "completed"}
//                   onClick={() => updateDeliveryStatus(plan._id, "lunch")}
//                 >
//                   {plan.delivery?.lunch === "pending"
//                     ? "Start Lunch"
//                     : plan.delivery?.lunch === "in_progress"
//                     ? "Mark Lunch Delivered"
//                     : "Lunch Delivered"}
//                 </button>

//                 {/* Dinner Button */}
//                 <button
//                   className={`btn btn-primary col m-1 shadow ${!isOnline ? "btn-secondary" : ""}`}
//                   disabled={!isOnline || plan.delivery?.dinner === "completed"}
//                   onClick={() => updateDeliveryStatus(plan._id, "dinner")}
//                 >
//                   {plan.delivery?.dinner === "pending"
//                     ? "Start Dinner"
//                     : plan.delivery?.dinner === "in_progress"
//                     ? "Mark Dinner Delivered"
//                     : "Dinner Delivered"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Item;
