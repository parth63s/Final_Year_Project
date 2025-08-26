import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './Register.css';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
    phone: '',
    address: '',
    city: '',
    country: '',
    profilePicture: '', 
    kitchenName:'',
  });
  const [preview, setPreview] = useState(null); // for preview image

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePicture" && files && files[0]) {
      const file = files[0];
      setFormData({
        ...formData,
        profilePicture: file, // store file itself
      });
      setPreview(URL.createObjectURL(file)); // preview
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      // Use FormData for file upload
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      const res = await axios.post('http://localhost:5000/api/auth/register', data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const role = res.data.role;
      // console.log(role)

      switch (role) {
        case 'customer':
          navigate('/customer', { state: { toast: "Welcome to Mom's Magic" } });
          break;
        case 'delivery':
          navigate('/delivery', { state: { toast: "Welcome to Delivery Mom's Magic" } });
          break;
        case 'service':
          navigate('/service', { state:{toast: "Welcome to Service Provider Mom's Magic"} });
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="container margin-top">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="register-box">
              <h2 className="text-center mb-4">Create Account</h2>

              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row g-3">
                  {/* Name */}
                  <div className="col-12">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoFocus
                    />
                  </div>

                  {/* Email */}
                  <div className="col-12">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="col-md-6">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="col-md-6">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Role */}
                  <div className="col-12">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select
                      className="form-select"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="customer">Customer</option>
                      <option value="delivery">Delivery Person</option>
                      <option value="service">Service Provider</option>
                    </select>
                  </div>

                  {formData.role === "service" && (
                    <div className="col-12">
                      <label htmlFor="kitchenName" className="form-label">Kitchen Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="kitchenName"
                        name="kitchenName"
                        value={formData.kitchenName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  )}

                  {/* Phone */}
                  <div className="col-12">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Address */}
                  <div className="col-12">
                    <label htmlFor="address" className="form-label">Address</label>
                    <textarea
                      className="form-control"
                      id="address"
                      name="address"
                      rows="2"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <label htmlFor="city" className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Profile Picture Upload with Preview */}
                  <div className="col-12">
                    <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
                    <input
                      type="file"
                      className="form-control"
                      id="profilePicture"
                      name="profilePicture"
                      accept="image/*"
                      onChange={handleChange}
                      // placeholder="https://example.com/profile.jpg"
                    />
                    {preview && (
                      <div className="mt-3 text-center">
                        <p>Preview:</p>
                        <img 
                          src={preview} 
                          alt="Profile Preview" 
                          style={{ maxWidth: "150px", borderRadius: "8px" }} 
                        />
                      </div>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary w-100 mb-3">
                      Sign Up
                    </button>
                    <button
                      type="button"
                      className="btn btn-link w-100 text-decoration-none"
                      onClick={() => navigate('/login')}
                    >
                      Already have an account? Sign In
                    </button>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
