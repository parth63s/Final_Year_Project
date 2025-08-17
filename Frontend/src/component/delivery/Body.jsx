import React, { useEffect, useState } from "react";
import axios from "axios";

const Body = () => {
  const [deliveryStats, setDeliveryStats] = useState({
    today: { total: 0, completed: 0, pending: 0, delayed: 0, efficiency: 0 },
    routes: {},
    subscriptionTypes: {}
  });

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.post("http://localhost:5000/api/delivery/create-today-for-all");
        const res = await axios.get("http://localhost:5000/api/delivery/today-stats");
        setDeliveryStats(res.data);
      } catch (err) {
        console.log("Error fetching delivery stats:", err);
      }
    };
    fetchData();
  }, []);

  const todayStats = deliveryStats.today;
  const active = deliveryStats.active;
  const subscriptionTypes = deliveryStats.subscriptionTypes;

  return (
    <div className="container delivery-container my-4">
      <div className="row g-3">
        <div className="col-12 col-md-3">
          <div className="card p-3 shadow">
            <h6 className="card-title">Today's Deliveries</h6>
            <h4>{todayStats.total}</h4>
            <p className="text-muted">
              Completed: {todayStats.completed}, Pending: {todayStats.pending}
            </p>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="card p-3 shadow">
            <h6 className="card-title">Efficiency Rate</h6>
            <h4>{todayStats.efficiency}%</h4>
            <p className="text-muted">Based on delivery times</p>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="card p-3 shadow">
            <h6 className="card-title">Active Routes</h6>
            <h4>{active}</h4>
            <p className="text-muted">
              Total deliveries: {todayStats.total}
            </p>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="card p-3 shadow">
            <h6 className="card-title">Subscription Mix</h6>
            <div className="d-flex justify-content-between">
              {Object.entries(subscriptionTypes).map(([type, count]) => (
                <div key={type} className="text-center">
                  <h6>{count / 2}</h6>
                  <p className="text-muted">{type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
