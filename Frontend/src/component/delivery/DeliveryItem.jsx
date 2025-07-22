import React, { useState } from "react";

const DeliveryItem = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("all");

  return (
    <div className="container delivery-margin my-4">
      <ul className="nav nav-tabs mb-3">
        {["Active Deliveries", "Route Overview", "Schedule"].map((label, index) => (
          <li className="nav-item" key={index}>
            <button className={`nav-link ${selectedTab === index ? "actives" : "not-actives"}`} onClick={() => setSelectedTab(index)}>
              <h6>{label}</h6>
            </button>
          </li>
        ))}
      </ul>
      <div className="d-flex gap-2 mb-3">
        <input
          type="date"
          className="form-control w-auto"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <select className="form-select w-auto" value={deliveryStatus} onChange={(e) => setDeliveryStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default DeliveryItem;
