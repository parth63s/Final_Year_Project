import React from 'react';
import NavBar from '../NavBar';
import FoodCard from './FoodCard';
import Footer from '../Footer';

function HomePage() {
    return (  
        <>
            <NavBar/>
            <FoodCard/>
            <Footer/>
        </>
     );
}

export default HomePage;