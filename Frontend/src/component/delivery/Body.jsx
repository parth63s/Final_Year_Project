import React from "react";

const Body = () => {
  const deliveryStats = {
    today: {
      total: 15,
      completed: 8,
      pending: 5,
      delayed: 2,
      efficiency: 87,
    },
    routes: {
      'Route A': 8,
      'Route B': 7,
    },
    subscriptionTypes: {
      Trial: 3,
      Weekly: 6,
      Monthly: 6,
    },
  };
  
  const todayStats = deliveryStats.today || { total: 0, completed: 0, pending: 0, efficiency: 0 };
  const routes = deliveryStats.routes || {};
  const subscriptionTypes = deliveryStats.subscriptionTypes || {};
  return (
    <div className="container delivery-container my-4">
      <div className="row g-3">
        <div className="col-12 col-md-3">
          <div className="card p-3 shadow">
            <h6 className="card-title">Today's Deliveries</h6>
            <h4>{todayStats.total}</h4>
                <p className="text-muted">Completed: {todayStats.completed}, Pending: {todayStats.pending}</p>
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
            <h4>{Object.keys(routes).length}</h4>
            <p className="text-muted">Total deliveries: {Object.values(routes).reduce((a, b) => a + b, 0)}</p>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="card p-3 shadow">
            <h6 className="card-title">Subscription Mix</h6>
            <div className="d-flex justify-content-between">
              {Object.entries(subscriptionTypes).map(([type, count]) => (
                <div key={type} className="text-center">
                  <h6>{count}</h6>
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