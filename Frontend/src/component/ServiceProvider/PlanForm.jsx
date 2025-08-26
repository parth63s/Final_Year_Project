import React, { useState } from "react";
import NavBar from "../NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const planDurations = {
  Trial: 3,
  Weekly: 7,
  Monthly: 30,
};

const AddPlanForm = ({ onSubmit }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "Trial",
    price: "",
    duration: planDurations["Trial"],
    mealsPerDay: "",
    description: "",
    features: [],
    support: false,
    menu: { lunch: [], dinner: [] },  // ✅ instead of []
    imageUrls: ["", "", "", ""],
  });


  const [newMenuItem, setNewMenuItem] = useState({
    type: "Lunch",
    item: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "name") {
      const days = planDurations[value];
      setFormData({
        ...formData,
        name: value,
        duration: days,
        menu: { lunch: [], dinner: [] }, // reset menu
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

  const handleImageChange = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedImages = [...formData.imageUrls];
      updatedImages[index] = reader.result;
      setFormData({ ...formData, imageUrls: updatedImages });
    };
    if (file) reader.readAsDataURL(file);
  };

  const addMenuItem = () => {
      if (newMenuItem.item.trim() !== "") {
        setFormData({
          ...formData,
          menu: {
            ...formData.menu,
            [newMenuItem.type.toLowerCase()]: [
              ...formData.menu[newMenuItem.type.toLowerCase()],
              newMenuItem.item
            ]
          }
        });
        setNewMenuItem({ type: newMenuItem.type, item: "" });
      }
    };


  const removeMenuItem = (type, index) => {
    const updated = formData.menu[type].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      menu: {
        ...formData.menu,
        [type]: updated
      }
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/plans/add", formData, { withCredentials: true });
      navigate("/service", { state: { message: "Plan saved successfully!" } });

      // reset form
      setFormData({
        name: "Trial",
        price: "",
        duration: planDurations["Trial"],
        mealsPerDay: "",
        description: "",
        features: [],
        support: false,
        menu: { lunch: [], dinner: [] },  // ✅ FIXED
        imageUrls: ["", "", "", ""],
      });
      toast.success("Plan added successfully!");
      navigate("/service");
    } catch (error) {
      toast.error("Failed to added plan.");
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

            {/* ✅ Food Menu To-Do List */}
            {/* ✅ Food Menu Section with Better UI */}
            <h5 className="mt-4 mb-3">🍽️ Food Menu</h5>

            <div className="card p-2 shadow-sm border-0 mb-3">
              <div className="d-flex gap-2">
                <select
                  className="form-select w-25"
                  value={newMenuItem.type}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, type: e.target.value })}
                >
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                </select>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter food item..."
                  value={newMenuItem.item}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, item: e.target.value })}

                />
                <button type="button" className="btn border  px-4" onClick={addMenuItem}>
                  ➕ Add
                </button>
              </div>
            </div>
            {/* Food Items Display */}
            <div className="row mt-3">
              {/* Lunch Column */}
              {/* Lunch */}
              <div className="col-md-6">
                <h6 className="text-center mb-3">🥗 Lunch</h6>
                {formData.menu.lunch.length === 0 ? (
                  <p className="text-muted text-center">No lunch items yet.</p>
                ) : (
                  formData.menu.lunch.map((item, idx) => (
                    <div key={idx} className="card shadow-sm border-0 p-3 mb-2 d-flex flex-row justify-content-between">
                      <span>{item}</span>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeMenuItem("lunch", idx)}
                      >
                        ❌
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Dinner */}
              <div className="col-md-6">
                <h6 className="text-center mb-3">🍛 Dinner</h6>
                {formData.menu.dinner.length === 0 ? (
                  <p className="text-muted text-center">No dinner items yet.</p>
                ) : (
                  formData.menu.dinner.map((item, idx) => (
                    <div key={idx} className="card shadow-sm border-0 p-3 mb-2 d-flex flex-row justify-content-between">
                      <span>{item}</span>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeMenuItem("dinner", idx)}
                      >
                        ❌
                      </button>
                    </div>
                  ))
                )}
              </div>

            </div>


            
        
            <button className="btn btn-primary w-100 mt-4" type="submit" onClick={onSubmit}>
              Add Plan
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPlanForm;
