import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import NavBar from "../NavBar";
import Footer from "../Footer";

function SubscriptionShowPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const role = user?.role;

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        let url = "";
        if (role === "customer") {
          url = "http://localhost:5000/api/showSubscription/user";
        } else if (role === "service") {
          url = "http://localhost:5000/api/showSubscription/service";
        } else {
          return;
        }

        const { data } = await axios.get(url, { withCredentials: true });
        setSubscriptions(data);
      } catch (err) {
        console.error("Error fetching subscriptions:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (role) fetchSubscriptions();
  }, [role]);
  console.log("Subscriptions:", subscriptions);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <NavBar />
      <div className="container my-5 flex-grow-1">
        <h2 className="fw-bold mb-4 text-center">
          {role === "customer" ? "My Subscriptions" : "All Subscriptions"}
        </h2>

        {subscriptions.length === 0 ? (
          <p className="text-center text-muted">No subscriptions found</p>
        ) : (
          <div className="row g-4">
            {subscriptions.map((sub) => (
              <div key={sub._id} className="col-md-6 col-lg-4">
                <div className="card border-0 shadow-lg rounded-4 h-100">
                  {/* Header */}
                  <div className="card-header text-white text-center rounded-top-4"
                       style={{
                         background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)"
                       }}>
                    <h5 className="mb-0 fw-bold">{sub.plan?.name || "Plan"}</h5>
                  </div>

                  {/* Body */}
                  <div className="card-body">
                    <p><strong>👥 Members:</strong> {sub.members}</p>
                    <p><strong>📅 Start:</strong> {new Date(sub.startDate).toLocaleDateString()}</p>
                    <p><strong>📅 End:</strong> {new Date(sub.endDate).toLocaleDateString()}</p>

                    <div className="flex-wrap gap-2 my-2">
                      <span className="badge bg-primary">🍴 Lunch: {sub.lunchSlot}</span>
                      <span className="badge bg-secondary">🍽 Dinner: {sub.dinnerSlot}</span>
                    </div>

                    <p className="fw-bold fs-5 text-success">
                      💰 ₹{sub.totalPrice}
                    </p>

                    <p>
                      <strong>Payment:</strong>{" "}
                      <span
                        className={`badge px-3 py-2 ${
                          sub.paymentStatus === "paid"
                            ? "bg-success"
                            : sub.paymentStatus === "pending"
                            ? "bg-warning text-dark"
                            : "bg-danger"
                        }`}
                        style={{ borderRadius: "12px" }}
                      >
                        {sub.paymentStatus}
                      </span>
                    </p>

                    {role === "customer" && (
                      <div className="mt-3 p-2 rounded bg-light border">
                        <p className="mb-1"><strong>👤 Provider:</strong> {sub.plan?.user?.name}</p>
                        <p className="mb-0"><strong>📧 Email:</strong> {sub.plan?.user?.email}</p>
                        <p className="mb-0"><strong>📞 Phone:</strong> {sub.plan?.user?.phone}</p>
                      </div>
                    )}

                    {role === "service" && (
                      <div className="mt-3 p-2 rounded bg-light border">
                        <p className="mb-1"><strong>👤 Customer:</strong> {sub.user?.name}</p>
                        <p className="mb-0"><strong>📧 Email:</strong> {sub.user?.email}</p>
                        <p className="mb-0"><strong>📞 Phone:</strong> {sub.user?.phone}</p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="card-footer text-center bg-transparent border-0">
                    <button className="btn btn-outline-primary rounded-pill px-4">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default SubscriptionShowPage;
