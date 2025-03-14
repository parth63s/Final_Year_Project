import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import Footer from "../Footer";

function FormPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "trial",
    members: 1,
    paymentMethod: "",
  });

  const planPrices = {
    trial: 200,
    weekly: 600,
    monthly: 2500,
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Subscription Successful!");
    navigate("/");
  };

  const totalPrice = planPrices[formData.plan] * formData.members;

  return (
    <>
        <NavBar/>

        <div className="container my-5 p-4 border rounded shadow" style={{ maxWidth: "500px" }}>
            <h2 className="text-center mb-4">Take Subscription</h2>
            <form onSubmit={handleSubmit}>
                {step === 1 && (
                <div>
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="text-center">
                        <button type="button" className="btn btn-primary" onClick={nextStep}>Next</button>
                    </div>
                </div>
                )}
                {step === 2 && (
                <div>
                    <div className="mb-3">
                        <label className="form-label">Select Plan</label>
                        <select className="form-select" name="plan" value={formData.plan} onChange={handleChange} required>
                            <option value="trial">2-Day Trial ($5)</option>
                            <option value="weekly">Weekly Plan ($30)</option>
                            <option value="monthly">Monthly Plan ($100)</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Number of Members</label>
                        <input type="number" className="form-control" name="members" value={formData.members} onChange={handleChange} min="1" required />
                    </div>
                    <div className="mb-3">
                        <h5>Total Price: ${totalPrice}</h5>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" onClick={prevStep}>Back</button>
                        <button type="button" className="btn btn-primary" onClick={nextStep}>Next</button>
                    </div>
                </div>
                )}
                {step === 3 && (
                <div>
                    <div className="mb-3">
                        <label className="form-label">Select Payment Method</label>
                        <select className="form-select" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
                            <option value="">Choose Payment Method</option>
                            <option value="credit_card">Credit Card</option>
                            <option value="paypal">PayPal</option>
                            <option value="upi">UPI</option>
                        </select>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" onClick={prevStep}>Back</button>
                        <button type="submit" className="btn btn-success">Subscribe Now</button>
                    </div>
                </div>
                )}
            </form>
        </div>
        <Footer/>
    </>
  );
}

export default FormPage;
