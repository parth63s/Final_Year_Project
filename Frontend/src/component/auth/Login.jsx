import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { showToast } from '../../utils/showToast'

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          email: formData.email,
          password: formData.password
        },
        {
          withCredentials: true
        }
      );

      const { role, email } = res.data.user;

      // Optional: store in localStorage
      localStorage.setItem('user', JSON.stringify({ email, role }));

      // Navigate based on role
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
       showToast(err.response?.data?.msg || 'Login failed', "error");
      // alert(err.response?.data?.msg || 'Login failed');
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
