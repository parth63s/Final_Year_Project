import React from 'react';
import NavBar from '../NavBar';

function FoodCard({image, name}) {
    return ( 
        <div className="container mt-5">
            <div className="row row-cols-lg-4 row-cols-md-2 row-cols-1 g-3">
                    <a className="food-card" href='/foodshow'>
                        <img src="./media/images/Food1.jpg" className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">tital</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </a>    
                    
                    <a className="food-card col">
                        <img src="./media/images/Food2.jpg" className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">tital</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </a>
                    <a className="food-card col">
                        <img src="./media/images/Food3.jpg" className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">tital</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </a>
                    <a className="food-card col">
                        <img src="./media/images/Food4.jpg" className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">tital</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </a>
                    
                        
            </div>
        </div>
     );
}

export default FoodCard;