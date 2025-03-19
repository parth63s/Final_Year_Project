import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import './Register.css';

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
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // if (formData.password !== formData.confirmPassword) {
    //   toast.error('Passwords do not match!');
    //   return;
    // }

    // Here you would typically make an API call to register
    localStorage.setItem('user', JSON.stringify({
      name: formData.name,
      email: formData.email,
      role: formData.role,
    }));
    
    // toast.success('Registration successful!');
    
    // Redirect based on role
    switch (formData.role) {
      case 'customer':
        navigate('/customer');
        break;
      case 'delivery':
        navigate('/delivery');
        break;
      case 'service':
        navigate('/service');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className="register-container">
      <div className="container margin-top">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="register-box">
              <h2 className="text-center mb-4">Create Account</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
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