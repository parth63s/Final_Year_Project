import React from 'react';
import NavBar from './NavBar';
import Footer from '../Footer';
import Body from './Body';
import "./Delivery.css";
import DeliveryItem from './DeliveryItem';
import Item from './Item';


function DeliveryPage() {
  return ( 
    <div className='delivery-background'>
      <NavBar/>
      <Body/>
      <DeliveryItem/>
      <Item/>
      <Footer/>
    </div>
   );
}

export default DeliveryPage;