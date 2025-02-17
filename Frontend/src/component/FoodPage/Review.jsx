import React from 'react';
import {RatingStarReadOnly, RatingStar} from './RatingStar';

function Review() {
    return ( 
        <div className="row order-3">
            <h1 className='fs-4'>Reviews & Ratings</h1>
            <div className='row mt-2'>
                <h1 className='fs-1 rating  text-center'>4.2</h1>
                <div className='col'>
                    <h1 className='fs-5'>23 Ratings</h1>
                    <p>Jd rating index based on 23 ratings across the web</p>
                </div>
                <div className='row'>
                    <RatingStarReadOnly rating={4}/>
                </div>
            </div>

            <div className='row'>
                <h1 className='fs-4 mt-5 mb-2'>Start Your Review</h1>
                <RatingStar/>
            </div>
        </div>
     );
}

export default Review;