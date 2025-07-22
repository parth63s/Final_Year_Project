import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImage from '../../assets/hero-tiffin.jpg';  // Replace with your image path

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid bg-light py-5 " id="hero-section">
      <div className="row align-items-center flex-md-row flex-column-reverse  ">
        {/* Left Content */}
        <motion.div 
          className="offset-1 col-md-5 text-center text-md-start"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="display-5 fw-bold mb-3">
            Taste The <span className="text-warning">Magic</span> of Homemade Food
          </h1>
          <p className="lead text-muted mb-4">
            Wholesome, hygienic, and homemade meals — delivered straight to your doorstep. Enjoy food made with love, just like mom's.
          </p>
          <button 
            className="btn btn-warning px-4 py-2 fw-semibold shadow" 
            onClick={() => navigate('/login')}
          >
            Get Started
          </button>
        </motion.div>

        {/* Right Image */}
        <motion.div 
          className="col-md-6 d-flex justify-content-center align-items-center mb-4 mb-md-0"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img 
            
            src={heroImage} 
            alt="Tiffin box" 
            className="img-fluid rounded-circle shadow-lg shape "
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{ maxWidth: "75%" }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
