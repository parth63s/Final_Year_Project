import React, { useEffect, useState } from 'react';
import { People } from '@mui/icons-material';
import axios from 'axios';

function ActiveSub() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/subscriptions/active-summary/', {withCredentials: true})
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);
  console.log(data)

  return (
    <section className="dashboard-section">
      <h2 className="section-title">
        <People className="me-2" />
        Active Subscriptions
      </h2>
      <div className="row">
        {data.map((plan) => (
          <div className="col-md-4" key={plan.name}>
            <div className="card subscription-card">
              <div className="card-body">
                <h5 className="card-title">{plan.name}</h5>
                <div className="subscription-count">{plan.count}</div>
                <div className="subscription-price">
                  ₹{plan.averagePrice.toFixed(2)} 
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ActiveSub;
