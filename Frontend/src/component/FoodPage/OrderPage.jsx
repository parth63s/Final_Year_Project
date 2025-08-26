import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../NavBar";
import Footer from "../Footer";
import { useAuth } from "../../context/AuthContext"; // adjust path

function OrderPage() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth(); // e.g. user = { id, name, role }
  const role = user?.role;

  useEffect(() => {
    if (!role) {
        setLoading(false); // stop loading if no role
        return;
    }
    const fetchDeliveries = async () => {
      try {
        let url = "";
        if (role === "customer") {
          url = "http://localhost:5000/api/delivery/user-deliveries";
        } else if (role === "service") {
          url = "http://localhost:5000/api/delivery/service-deliveries";
        } else {
          return;
        }

        const { data } = await axios.get(url, { withCredentials: true });
        setDeliveries(data);
      } catch (err) {
        console.error("Error fetching deliveries:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (role) fetchDeliveries();
  }, [role]);
  console.log("Deliveries:", deliveries);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  // Separate upcoming & past deliveries
  // Normalize date (remove time part)
    const normalizeDate = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Separate upcoming & past deliveries
    const upcoming = deliveries.filter(
    (d) => normalizeDate(d.deliveryDate) >= today.getTime()
    );
    const past = deliveries.filter(
    (d) => normalizeDate(d.deliveryDate) < today.getTime()
    );

  return (
    <div>
      <NavBar />
      <div className="container my-5">
        {/* ========== UPCOMING / CURRENT ORDERS ========== */}
        <h3 className="fw-bold mb-4">Your Current Deliveries</h3>
        {upcoming.length === 0 ? (
          <p className="text-center text-muted">No upcoming deliveries</p>
        ) : (
          <div className="row g-4">
            {upcoming.map((delivery) => {
              const latestStatus = delivery.status;
              return (
                <div key={delivery._id} className="col-md-6">
                  <div className="card shadow-lg border-0 rounded-3">
                    <div className="card-body">
                      <h5 className="card-title fw-bold">
                        {delivery.subscriptionId?.plan?.name || "Food Item"}
                      </h5>
                      <p className="card-text text-muted mb-1">
                        <strong>Delivery Date:</strong>{" "}
                        {new Date(delivery.deliveryDate).toLocaleDateString()}
                      </p>
                      <p className="card-text text-muted mb-3">
                        <strong>Delivery Time:</strong> {delivery.slotTime}
                      </p>

                      {/* Status Checkboxes */}
                      <div className="d-flex flex-column gap-2">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={
                              latestStatus === "start_delivery" ||
                              latestStatus === "delivered" ||
                              latestStatus === "pending"
                            }
                            readOnly
                          />
                          <label className="form-check-label fw-semibold">
                            Start Delivery
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={
                              latestStatus === "pending" ||
                              latestStatus === "delivered"
                            }
                            readOnly
                          />
                          <label className="form-check-label fw-semibold">
                            On The Way
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={latestStatus === "delivered"}
                            readOnly
                          />
                          <label className="form-check-label fw-semibold text-success">
                            Delivered
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ========== PAST ORDERS ========== */}
        <h3 className="fw-bold mt-5 mb-4">Previous Orders</h3>
        {past.length === 0 ? (
          <p className="text-center text-muted">No previous orders</p>
        ) : (
          <div className="row g-4">
            {past.map((delivery) => (
              <div key={delivery._id} className="col-md-6">
                <div className="card shadow-sm border-0 rounded-3">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">
                      {delivery.subscriptionId?.plan?.name || "Food Item"}
                    </h5>
                    <p className="card-text text-muted mb-1">
                      <strong>Date:</strong>{" "}
                      {new Date(delivery.deliveryDate).toLocaleDateString()}
                    </p>
                    <p className="card-text">
                      {delivery.status === "delivered" ? (
                        <span className="badge bg-success px-3 py-2">✅ Done</span>
                      ) : (
                        <span className="badge bg-danger px-3 py-2">❌ Cancelled</span>
                      )}
                    </p>
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

export default OrderPage;
