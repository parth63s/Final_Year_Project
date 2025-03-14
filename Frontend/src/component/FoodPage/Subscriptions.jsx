import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const menuData = {
  trial: { price: "200", menu: [
    { date: "27-9-2025", day: "Monday", lunch: "Roti, dal", dinner: "Roti, dal" },
    { date: "28-9-2025", day: "Tuesday", lunch: "Rice, curry", dinner: "Rice, curry" },
  ]},
  weekly: { price: "600", menu: [
    { date: "27-9-2025", day: "Monday", lunch: "Roti, dal", dinner: "Roti, dal" },
    { date: "28-9-2025", day: "Tuesday", lunch: "Rice, curry", dinner: "Rice, curry" },
    { date: "29-9-2025", day: "Wednesday", lunch: "Paratha, sabzi", dinner: "Paratha, sabzi" },
    { date: "30-9-2025", day: "Thursday", lunch: "Pulao, raita", dinner: "Pulao, raita" },
    { date: "1-10-2025", day: "Friday", lunch: "Biryani, salad", dinner: "Biryani, salad" },
    { date: "2-10-2025", day: "Saturday", lunch: "Khichdi, yogurt", dinner: "Khichdi, yogurt" },
    { date: "3-10-2025", day: "Sunday", lunch: "Pasta, garlic bread", dinner: "Pasta, garlic bread" },
  ]},
  monthly: { price: "2500", menu: new Array(30).fill(0).map((_, i) => ({
    date: `${i + 1}-10-2025`,
    day: `Day ${i + 1}`,
    lunch: "Varied Menu",
    dinner: "Varied Menu",
  }))}
};

function Subscriptions() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h2 className="text-center">Choose Your Subscription Plan</h2>

      {/* Subscription Buttons */}
      <div className="d-flex justify-content-center gap-3 mt-3">
        <button className="btn btn-outline-secondary" onClick={() => setSelectedPlan("trial")}> 2-Day Trial (200) </button>
        <button className="btn btn-outline-primary" onClick={() => setSelectedPlan("weekly")}> Weekly Plan (600) </button>
        <button className="btn btn-primary" onClick={() => setSelectedPlan("monthly")}> Monthly Plan (2500) </button>
      </div>

      {/* Show Menu if a plan is selected */}
      {selectedPlan && (
        <div className="mt-4">
          <h4 className="text-center">Food Menu for {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan</h4>
          <p className="text-center fw-bold">Price: {menuData[selectedPlan].price}</p>

          {/* Table Container for Scroll */}
          <div className="table-responsive" style={{ maxHeight: "300px", overflowY: "auto" }}>
            <table className="table table-striped border">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">Day</th>
                  <th scope="col">Lunch</th>
                  <th scope="col">Dinner</th>
                </tr>
              </thead>
              <tbody>
                {menuData[selectedPlan].menu.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.date}</td>
                    <td>{item.day}</td>
                    <td>{item.lunch}</td>
                    <td>{item.dinner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Take Subscription Button */}
          <div className="text-center mt-3">
            <button className="btn btn-success" onClick={() => navigate("/subscribe")}>
              Take Subscription
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Subscriptions;
