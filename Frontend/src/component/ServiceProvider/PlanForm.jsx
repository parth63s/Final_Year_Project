import React, { useState } from "react";
import NavBar from "../NavBar";
import axios from "axios";

const planDurations = {
  Trial: 3,
  Weekly: 7,
  Monthly: 30,
};

const AddPlanForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "Trial",
    price: "",
    duration: planDurations["Trial"],
    mealsPerDay: "",
    description: "", // ✅ Added
    features: [],
    support: false,
    menu: Array.from({ length: planDurations["Trial"] }, () => ({ lunch: "", dinner: "" })),
    imageUrls: ["", "", "", ""],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "name") {
      const days = planDurations[value];
      setFormData({
        ...formData,
        name: value,
        duration: days,
        menu: Array.from({ length: days }, () => ({ lunch: "", dinner: "" })),
      });
    } else if (type === "checkbox" && name === "features") {
      const feature = value;
      const updatedFeatures = checked
        ? [...formData.features, feature]
        : formData.features.filter((f) => f !== feature);
      setFormData({ ...formData, features: updatedFeatures });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleMenuChange = (index, type, value) => {
    const newMenu = [...formData.menu];
    newMenu[index][type] = value;
    setFormData({ ...formData, menu: newMenu });
  };

  const handleImageChange = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedImages = [...formData.imageUrls];
      updatedImages[index] = reader.result;
      setFormData({ ...formData, imageUrls: updatedImages });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/plans/add", formData, { withCredentials: true });
      alert("Plan saved successfully!");
      setFormData({
        name: "Trial",
        price: "",
        duration: planDurations["Trial"],
        mealsPerDay: "",
        description: "", // ✅ Reset description
        features: [],
        support: false,
        menu: Array.from({ length: planDurations["Trial"] }, () => ({ lunch: "", dinner: "" })),
        imageUrls: ["", "", "", ""],
      });
    } catch (error) {
      console.error(error);
      alert("Failed to save plan.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mt-4" style={{ maxWidth: "700px" }}>
        <div className="card shadow-sm border-0 p-4">
          <h4 className="mb-3">➕ Add New Plan</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>Plan Name</label>
              <select
                name="name"
                className="form-select"
                value={formData.name}
                onChange={handleChange}
                required
              >
                <option value="Trial">Trial</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>

            <div className="row">
              <div className="form-group col-md-6 mb-3">
                <label>Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group col-md-6 mb-3">
                <label>Duration (Days)</label>
                <input
                  type="number"
                  name="duration"
                  className="form-control"
                  value={formData.duration}
                  readOnly
                />
              </div>
            </div>

            <div className="form-group mb-3">
              <label>Meals Per Day</label>
              <input
                type="number"
                name="mealsPerDay"
                className="form-control"
                value={formData.mealsPerDay}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label>Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter a brief description of the plan"
                required
              ></textarea>
            </div>

            <label className="mb-2">Features</label>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Basic menu"
                name="features"
                checked={formData.features.includes("Basic menu")}
                onChange={handleChange}
              />
              <label className="form-check-label">Basic Menu</label>
            </div>

            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                value="Premium menu"
                name="features"
                checked={formData.features.includes("Premium menu")}
                onChange={handleChange}
              />
              <label className="form-check-label">Premium Menu</label>
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                value="Free delivery"
                name="features"
                checked={formData.features.includes("Free delivery")}
                onChange={handleChange}
              />
              <label className="form-check-label">Free Delivery</label>
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                name="support"
                checked={formData.support}
                onChange={handleChange}
              />
              <label className="form-check-label">Priority Support</label>
            </div>

            <h5 className="mt-4 mb-2">Upload 4 Images</h5>
            <div className="row">
              {formData.imageUrls.map((img, idx) => (
                <div className="col-6 mb-3" key={idx}>
                  <label>Image {idx + 1}</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={(e) => handleImageChange(idx, e.target.files[0])}
                    required
                  />
                  {img && (
                    <img
                      src={img}
                      alt={`Preview ${idx + 1}`}
                      style={{ marginTop: "5px", width: "100%", maxHeight: "150px", objectFit: "cover" }}
                    />
                  )}
                </div>
              ))}
            </div>

            <h5 className="mt-4 mb-3">Menu Per Day</h5>
            {formData.menu.map((day, index) => (
              <div key={index} className="border rounded p-3 mb-3">
                <strong>Day {index + 1}</strong>
                <div className="form-group mt-2">
                  <label>Lunch</label>
                  <input
                    type="text"
                    className="form-control"
                    value={day.lunch}
                    onChange={(e) => handleMenuChange(index, "lunch", e.target.value)}
                    placeholder="Enter lunch menu"
                  />
                </div>
                <div className="form-group mt-2">
                  <label>Dinner</label>
                  <input
                    type="text"
                    className="form-control"
                    value={day.dinner}
                    onChange={(e) => handleMenuChange(index, "dinner", e.target.value)}
                    placeholder="Enter dinner menu"
                  />
                </div>
              </div>
            ))}

            <button className="btn btn-primary w-100 mt-3" type="submit">
              Add Plan
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPlanForm;
