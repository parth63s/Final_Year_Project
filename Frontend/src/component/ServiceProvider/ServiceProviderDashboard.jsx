import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './ServiceProviderDashboard.css';
import Footer from '../Footer';
import NavBar from '../NavBar';
import ServicePlans from './ServicePlans';
import ActiveSub from './ActiveSub';
import ServiceRating from './ServiceRating';
import ServiceMenu from './ServiceMenu';
import { showToast } from '../../utils/showToast'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import DailyChart from './DailyChart';

const ServiceProviderDashboard = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.toast) {
      showToast(location.state.toast, "success");
    }
  }, [location.state]);
  // Mock data for ratings and reviews
  const [ratings] = useState({
    overallRating: 4.5,
    totalReviews: 128,
    recentReviews: [
      {
        id: 1,
        user: 'John Doe',
        rating: 5,
        comment: 'Excellent service and delicious food!',
        date: '2024-03-14'
      },
      {
        id: 2,
        user: 'Jane Smith',
        rating: 4,
        comment: 'Good quality food, timely delivery.',
        date: '2024-03-13'
      }
    ]
  });

  // Mock data for subscriptions
  const [subscriptions] = useState({
    trial: 15,
    weekly: 45,
    monthly: 150,
    activeSubscribers: {
      trial: 8,
      weekly: 25,
      monthly: 42
    }
  });

  // Mock data for menu items
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: 'Dal Makhani',
      category: 'Main Course',
      price: 120,
      available: true
    },
    {
      id: 2,
      name: 'Paneer Butter Masala',
      category: 'Main Course',
      price: 150,
      available: true
    }
  ]);


  return (
    <>
    <NavBar/>
    <div className="dashboard-container">
      {/* Main Content */}
      <main className="dashboard-main">
        <div className="container">
          <DailyChart/>
          {/* Ratings & Reviews Section */}
          <ServiceRating/>
          {/* Subscriptions Section */}
          <ActiveSub/>
          {/* Menu Management Section */}
          {/* <ServiceMenu/> */}

          <ServicePlans/>
        </div>
      </main>
    </div>
    <Footer/>
    </>
  );
};

export default ServiceProviderDashboard; 