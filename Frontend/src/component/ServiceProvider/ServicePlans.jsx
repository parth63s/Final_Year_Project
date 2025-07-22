import React, { useState, useEffect } from 'react';
import { 
  AttachMoney,
  Add,
  Edit,
  Delete
} from '@mui/icons-material';
import './ServiceProviderDashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ServicePlans() {
  const navigate = useNavigate();
  const [pricingPlans, setPricingPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAdd = () => {
    navigate("/service/addPlan");
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/plans/user", {
          withCredentials: true
        });
        setPricingPlans(res.data.plans || []);
      } catch (error) {
        console.error("Error fetching plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return (
    <>
      <section className="dashboard-section">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="section-title">
            <AttachMoney className="me-2" />
            Pricing Plans
          </h2>
          <button className="btn btn-primary" onClick={handleAdd}>
            <Add className="me-2" /> Add New Plan
          </button>
        </div>

        {loading ? (
          <p>Loading plans...</p>
        ) : pricingPlans.length === 0 ? (
          <p>No plans added yet.</p>
        ) : (
          <div className="row">
            {pricingPlans.map(plan => (
              <div key={plan._id} className="col-md-4 mb-4">
                <div className="card pricing-card">
                  <div className="card-body">
                    <h5 className="card-title">{plan.name}</h5>
                    <div className="pricing-amount">₹{plan.price}</div>
                    <div className="pricing-duration">{plan.duration} days</div>
                    <ul className="pricing-features">
                      <li>{plan.mealsPerDay} meals per day</li>
                      {plan.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                      {plan.support && <li>Priority support</li>}
                    </ul>
                    <div className="pricing-actions">
                      <button className="btn btn-outline-primary me-2">
                        <Edit fontSize="small" />
                      </button>
                      <button className="btn btn-outline-danger">
                        <Delete fontSize="small" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default ServicePlans;
