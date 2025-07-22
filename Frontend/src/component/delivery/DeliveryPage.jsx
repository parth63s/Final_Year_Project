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


function DeliveryPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.toast) {
      showToast(location.state.toast, "success");
    }
  }, [location.state]);

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