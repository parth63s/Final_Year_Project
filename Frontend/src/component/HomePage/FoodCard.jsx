import React from "react";
import NavBar from "../NavBar";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./FoodCard.css"; // Add styles for hover effects

const foodItems = [
  { image: "./media/images/Food1.jpg", name: "Pani Puri", description: "Crispy puris filled with spicy and tangy water." },
  { image: "./media/images/Food2.jpg", name: "Butter Naan & Paneer", description: "Soft buttery naan with rich paneer gravy." },
  { image: "./media/images/Food3.jpg", name: "Indian Thali", description: "A traditional Indian meal with multiple curries." },
  { image: "./media/images/Food4.jpg", name: "South Indian Meal", description: "Delicious dosa, idli, and sambar." },
];

function FoodCard() {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Our Special Dishes</h2>
      <div className="row row-cols-lg-4 row-cols-md-2 row-cols-1 g-4">
        {foodItems.map((food, index) => (
          <div key={index} className="col">
            <a href="/foodshow" className="food-card card shadow-sm">
              <img src={food.image} className="card-img-top food-img" alt={food.name} />
              <div className="card-body text-center">
                <h5 className="card-title">{food.name}</h5>
                <p className="card-text">{food.description}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodCard;
