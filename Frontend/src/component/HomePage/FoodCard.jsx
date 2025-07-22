import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { showToast } from "../../utils/showToast";
import { motion } from "framer-motion";
import axios from "axios";
import { Star } from "@mui/icons-material";

function FoodCard() {
  const location = useLocation();
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    if (location.state?.toast) {
      showToast(location.state.toast, "success");
    }
  }, [location.state]);

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

  console.log(foodItems);

  

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Our Special Dishes</h2>
      <div className="row row-cols-lg-4 row-cols-md-2 row-cols-1 g-4">
        {foodItems.map((food, index) => (
          <motion.div
            key={food._id}
            className="col"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="position-relative">
              <a
                href={`/foodshow/${food._id}`}
                className="food-card card shadow-sm h-100 text-decoration-none text-dark"
              >
                {/* Plans badge in top-right */}
                <div className="position-absolute top-0 end-0 m-2 d-flex flex-column align-items-end">
                  {food.name === "Trial" && (
                    <span className="badge bg-primary mb-1">Trial</span>
                  )}
                  {food.name === "Weekly" && (
                    <span className="badge bg-success mb-1">Weekly</span>
                  )}
                  {food.name === "Monthly" && (
                    <span className="badge bg-warning text-dark">Monthly</span>
                  )}
                </div>

                <img
                  src={food.imageUrls[0] || "/media/images/default.jpg"}
                  className="card-img-top food-img"
                  alt={food.name}
                />

                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    {/* Left: name + description */}
                    <div className="text-start">
                      <p className="card-title mb-1 fs-5">{food.name}</p>
                      {/* <p className="card-text mb-2">{food.description}</p> */}
                    </div>

                    {/* Right: rating stars + avg rating */}
                    <div className="text-warning text-end ms-3">
                      {[...Array(Math.round(food.rating || 0))].map((_, i) => (
                        <Star key={i} fontSize="small" />
                      ))}
                      <div className="text-muted fs-5" style={{ fontSize: "0.8rem" }}>
                        <i className="fa-solid fa-star text-warning"></i> {" "}
                        {food.reviews && food.reviews.length > 0
                          ? (food.reviews.reduce((sum, r) => sum + r.rating, 0) / food.reviews.length).toFixed(1)
                          : "0.0"}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default FoodCard;
