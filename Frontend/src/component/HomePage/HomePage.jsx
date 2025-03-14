import React from 'react';
import NavBar from '../NavBar';
import FoodCard from './FoodCard';
import Footer from '../Footer';

const foodItems = [
    { image: "./media/images/Food1.jpg", name: "Pizza", description: "Delicious cheesy pizza with toppings." },
    { image: "./media/images/Food2.jpg", name: "Burger", description: "Juicy beef burger with fresh lettuce and tomato." },
    { image: "./media/images/Food3.jpg", name: "Pasta", description: "Creamy Alfredo pasta with mushrooms." },
    { image: "./media/images/Food4.jpg", name: "Sushi", description: "Fresh sushi rolls with salmon and avocado." },
  ];
  
function HomePage() {
    return (  
        <>
            <NavBar/>
            <FoodCard foodItems={foodItems} />
            <Footer/>
        </>
     );
}

export default HomePage;