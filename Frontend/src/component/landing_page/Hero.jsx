import React from 'react';
import { useNavigate } from 'react-router-dom';

function Hero(value) {
    const navigate = useNavigate();

    return ( 
        <div className="container mb-4 m-t-container background-image " id="item-1">
            <div className="row">
                <div className="col p-5">
                    <h1 className='fs-2 text-shadow'>Taste The Magic of Homemade Food</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ea dolores accusamus, aut unde reprehenderit?</p>
                    <button className='btn get-start' onClick={()=>navigate("/login")}>Get Started</button>
                </div>
                <div className="col d-flex justify-content-center">
                    <div className='shape '></div>
                </div>
            </div>
        </div>
     );
}

export default Hero;