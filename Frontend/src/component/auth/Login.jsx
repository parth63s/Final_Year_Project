import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'customer'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify({
      email: formData.email,
      role: formData.role,
    }));
    
    // toast.success('Login successful!');
    
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
    
    <div className="login-container">
      <div className="container margin-top">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="login-box">
              <h2 className="text-center mb-4">Welcome Back</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoFocus
                  />
                </div>

                <div className="mb-3">
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

                <div className="mb-4">
                  <label htmlFor="role" className="form-label">Role</label>
                  <select
                    className="form-select"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="customer">Customer</option>
                    <option value="delivery">Delivery Person</option>
                    <option value="service">Service Provider</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-3">
                  Sign In
                </button>

                <button
                  type="button"
                  className="btn btn-link w-100 text-decoration-none"
                  onClick={() => navigate('/register')}
                >
                  Don't have an account? Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;