import React from 'react';
import NavBar from './NavBar';
import Footer from '../Footer';
import Body from './Body';
import "./Delivery.css";
import DeliveryItem from './DeliveryItem';
import Item from './Item';
import { OnlineStatusProvider } from "./OnlineStatusContext";
import { showToast } from '../../utils/showToast'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function DeliveryPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.toast) {
      showToast(location.state.toast, "success");
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  return ( 
    <div className='delivery-background'>
      <OnlineStatusProvider>
        <NavBar/>
        <Body/>
        <DeliveryItem/>
        <Item/>
        <Footer/>
      </OnlineStatusProvider>
    </div>
   );
}

export default DeliveryPage;