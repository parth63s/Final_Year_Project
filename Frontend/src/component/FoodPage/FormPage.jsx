import React, { useState } from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import { FaUser, FaCalendarAlt, FaUtensils } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function FormPage() {
  const [members, setMembers] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [lunchSlot, setLunchSlot] = useState("");
  const [dinnerSlot, setDinnerSlot] = useState("");
  const { id } = useParams(); // planId from URL

  const totalPrice = 100 * members; // Simple pricing logic

  const handlePayment = () => {
    if (!startDate || !members || !lunchSlot || !dinnerSlot) {
      toast.error("Please fill all details");
      return;
    }

    const options = {
      key: "rzp_test_rSKVL06FYvvxA5", // Replace with your Razorpay key
      secret: "Ie5mQB0QNwbFasOJAEWomrtz",
      amount: totalPrice * 100,
      currency: "INR",
      name: "Tiffin Service",
      description: `Subscription for ${members} member(s)`,
      handler: async function (response) {
        toast.success("Payment successful!");

        try {
          const result = await axios.post(
            `http://localhost:5000/api/${id}/subscribe`,
            {
              planId: id,
              members,
              startDate,
              lunchSlot,
              dinnerSlot,
              razorpayPaymentId: response.razorpay_payment_id,
            },
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (result.data.subscription) {
            toast.success("Subscription created successfully!");
            // Optional: redirect to summary page
          } else {
            toast.error("Subscription failed: " + result.data.error);
          }
        } catch (err) {
          // console.error("Subscription error:", err?.response?.data || err.message);
            toast.error(
              err?.response?.data?.message ||
                err?.response?.data?.error ||
                "Server error while creating subscription."
            );
        }
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
      },
      theme: {
        color: "#0d6efd",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <NavBar />
      <div className="container my-5 d-flex justify-content-center">
        <div
          className="row shadow rounded p-4 w-100"
          style={{ maxWidth: "900px", backgroundColor: "#f9f9f9" }}
        >
          {/* Left: Form */}
          <div className="col-md-6 border-end">
            <h4 className="mb-4">🍽️ Subscription Details</h4>

            <div className="mb-3">
              <label className="form-label fw-bold">Number of Members</label>
              <input
                type="number"
                className="form-control"
                min="1"
                value={members}
                onChange={(e) => setMembers(Number(e.target.value))}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Lunch Time Slot</label>
              <select
                className="form-select"
                value={lunchSlot}
                onChange={(e) => setLunchSlot(e.target.value)}
              >
                <option value="">Select lunch slot</option>
                <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                <option value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM</option>
                <option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Dinner Time Slot</label>
              <select
                className="form-select"
                value={dinnerSlot}
                onChange={(e) => setDinnerSlot(e.target.value)}
              >
                <option value="">Select dinner slot</option>
                <option value="6:00 PM - 7:00 PM">6:00 PM - 7:00 PM</option>
                <option value="7:00 PM - 8:00 PM">7:00 PM - 8:00 PM</option>
                <option value="8:00 PM - 9:00 PM">8:00 PM - 9:00 PM</option>
              </select>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="col-md-6 mt-5">
            <h4 className="mb-4">📦 Summary</h4>
            <div className="bg-white p-3 rounded shadow-sm">
              <p>
                <FaUser className="me-2 text-success" /> <strong>Members:</strong>{" "}
                {members}
              </p>
              <p>
                <FaCalendarAlt className="me-2 text-danger" /> <strong>Start Date:</strong>{" "}
                {startDate || "Not selected"}
              </p>
              <p>
                <FaUtensils className="me-2 text-warning" /> <strong>Lunch:</strong>{" "}
                {lunchSlot || "Not selected"}
              </p>
              <p>
                <FaUtensils className="me-2 text-warning" /> <strong>Dinner:</strong>{" "}
                {dinnerSlot || "Not selected"}
              </p>
              <hr />
              <h5 className="text-end text-primary">Total: ₹{totalPrice}</h5>
              <div className="d-grid mt-3">
                <button
                  className="btn btn-success btn-lg"
                  onClick={handlePayment}
                >
                  ✅ Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default FormPage;
