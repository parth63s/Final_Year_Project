import Footer from '../Footer';
import NavBar from '../NavBar';
import ServicePlans from './ServicePlans';
import ActiveSub from './ActiveSub';
import ServiceRating from './ServiceRating';
import { showToast } from '../../utils/showToast'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import DailyChart from './DailyChart';
import { useNavigate } from 'react-router-dom';
import "./serviceProviderDashboard.css"

const ServiceProviderDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.toast) {
      showToast(location.state.toast, "success");
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);
  

  return (
    <>
    <NavBar/>
    <div className="dashboard-container">
      <main className="dashboard-main">
        <div className="container">
          <DailyChart/>
          
          <ServiceRating/>
          
          <ActiveSub/>
      
          <ServicePlans/>
        </div>
      </main>
    </div>
    <Footer/>
    </>
  );
};

export default ServiceProviderDashboard; 