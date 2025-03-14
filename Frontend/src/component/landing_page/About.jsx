import React from 'react';

function About() {
    return ( 
        <div className="container m-t-container mb-4" id="item-3">
            <div className='row d-flex justify-content-center mb-5'>
                <h1 className='fs-4 text-center text-shadow'>About Us</h1>
                <div className='line'></div>
            </div>
            <div className="row">
                <div className="col">
                    <h1 className='fs-5'>
                        On time-nutritious home food - every day-without any hassle 
                    </h1>
                    <div className='line'></div>

                    <p className='pt-3 opacity-50'>Many people are migrating to metro cities like pune for work, higher studies, better living, etc. In the lieu of making a better life most of them end up compromising with the two most significant neessities, first being FOOD and another one is shelter one is shelter. And this is how mom's magic came into life. to end the struggle for the meal. </p>
                    <p className='pt-3 opacity-50'>Let's not deny the fact. that the basic requirement when it comes to food are Quality and Quantity. Amidst all the flashy city lights. it becomes almost impossible to put light on the importance of healthy eating. We ad a team believe that it is of atmost importance to have on time- nutritious food-every day - without any hassle. Hear we promise you to deliver the tastiest, healthiest and pocket friendiest tiffin service your location</p>
                </div>
                <div className="col d-flex justify-content-center ">
                    <img src="./media/images/about.png" alt="" className='about-img'/>
                </div>
            </div>
        </div>
     );
}

export default About;