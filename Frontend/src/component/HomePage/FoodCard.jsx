import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { showToast } from "../../utils/showToast";
import { motion } from "framer-motion";
import axios from "axios";
import { Star, LocalDining, AccessTime } from "@mui/icons-material";

function FoodCard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState([]);
  const [planFilter, setPlanFilter] = useState("All");
  const [reviewFilter, setReviewFilter] = useState("All");

  useEffect(() => {
    if (location.state?.toast) {
      showToast(location.state.toast, "success");
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    async function fetchFood() {
      try {
        const res = await axios.get("http://localhost:5000/api/foods");
        setFoodItems(res.data);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    }
    fetchFood();
  }, []);
  // console.log(foodItems)
  // ⭐ Calculate average rating
  const getAverageRating = (food) =>
    food.reviews && food.reviews.length > 0
      ? food.reviews.reduce((sum, r) => sum + r.rating, 0) /
        food.reviews.length
      : 0;

  // Filter logic
  const filteredItems = foodItems.filter((food) => {
    const matchesPlan = planFilter === "All" ? true : food.name === planFilter;

    const avgRating = getAverageRating(food);
    const matchesReview =
      reviewFilter === "All"
        ? true
        : reviewFilter === "4+"
        ? avgRating >= 4
        : reviewFilter === "3+"
        ? avgRating >= 3
        : reviewFilter === "2+"
        ? avgRating >= 2
        : avgRating >= 1;

    return matchesPlan && matchesReview;
  });

  return (
    <div className="container mt-5">
      {/* <h3>Our Food Plans</h3> */}
      {/* 🔹 Filters Section */}
      <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mb-5">
        {/* Plan Filter */}
        <div className="btn-group shadow-sm rounded-pill overflow-hidden">
          {["All", "Trial", "Weekly", "Monthly"].map((f) => (
            <motion.button
              key={f}
              whileTap={{ scale: 0.9 }}
              className={`btn px-4 py-2 ${
                planFilter === f ? "btn-dark text-white" : "btn-light"
              }`}
              onClick={() => setPlanFilter(f)}
            >
              {f}
            </motion.button>
          ))}
        </div>

        {/* Review Filter */}
        <div className="btn-group shadow-sm rounded-pill overflow-hidden">
          {["All", "4+", "3+", "2+", "1+"].map((r) => (
            <motion.button
              key={r}
              whileTap={{ scale: 0.9 }}
              className={`btn px-4 py-2 ${
                reviewFilter === r ? "btn-dark text-white" : "btn-light"
              }`}
              onClick={() => setReviewFilter(r)}
            >
              ⭐ {r}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Food Cards */}
        <div className="row row-cols-lg-4 row-cols-md-2 row-cols-1 g-4">
          {filteredItems.map((food, index) => (
            <a className="text-decoration-none"  href={`/foodshow/${food._id}`}>
              <motion.div
                key={food._id}
                className="col"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="card border-0 shadow-lg h-100 food-card-unique"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    position: "relative",
                    background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
                  }}
                >
                  {/* Plan Badge */}
                  <div className="position-absolute top-0 end-0 m-2 d-flex flex-column align-items-end">
                    {food.name === "Trial" && (
                      <span className="badge bg-primary mb-1 px-3 py-2">Trial</span>
                    )}
                    {food.name === "Weekly" && (
                      <span className="badge bg-success mb-1 px-3 py-2">
                        Weekly
                      </span>
                    )}
                    {food.name === "Monthly" && (
                      <span className="badge bg-warning text-dark px-3 py-2">
                        Monthly
                      </span>
                    )}
                  </div>

                  {/* Image */}
                  <img
                    src={food.imageUrls[0] || "/media/images/default.jpg"}
                    className="card-img-top"
                    alt={food.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />

                  {/* Card Body */}
                  <div className="card-body">
                    {/* Food Name + Rating */}
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="fw-bold  mb-0">{food.user.kitchenName}</h6>

                      <div className="d-flex align-items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            fontSize="small"
                            style={{
                              color:
                                i < Math.round(getAverageRating(food))
                                  ? "#ffc107"
                                  : "#e4e5e9",
                            }}
                          />
                        ))}
                        <span
                          className="ms-2 text-muted"
                          style={{ fontSize: "0.85rem" }}
                        >
                          {getAverageRating(food).toFixed(1)}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="d-flex justify-content-between text-muted small mb-2">
                      <span>
                        <LocalDining fontSize="small" /> Meals:{" "}
                        {food.mealsPerDay || "N/A"}
                      </span>
                      <span>
                        <AccessTime fontSize="small" /> {food.duration || "—"} days
                      </span>
                    </div>

                    {/* Price */}
                    {/* Price */}
                      {/* <div className="mt-3">
                        <div
                          className="d-inline-flex align-items-baseline px-3 py-2 rounded-pill shadow-sm"
                          style={{
                            background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                            color: "white",
                          }}
                        >
                          <span className="fw-bold fs-5">₹{food.price || "N/A"}</span>
                          {food.duration && (
                            <span className="ms-1" style={{ fontSize: "0.85rem", opacity: 0.9 }}>
                              / {food.duration} days
                            </span>
                          )}
                        </div>
                      </div> */}

                  </div>
                </motion.div>
              </motion.div>
              </a>  
            ))}
        </div>
    </div>
  );
}

export default FoodCard;
