import React from 'react';
import {RatingStarReadOnly, RatingStar} from './RatingStar';

function Review() {
    return ( 
        <div className="mt-5">
                <h1 className='fs-4 fw-bold'>Reviews & Ratings</h1>
                <div className='row mt-2 align-items-center'>
                    <div className='col-md-3 rating text-center'>
                        <h1 className='fs-1 text'>4.2</h1>
                    </div>
                    <div className='col-md-6'>
                        <h1 className='fs-5'>23 Ratings</h1>
                        <p className='text-muted'>JD rating index based on 23 ratings across the web</p>
                        <RatingStarReadOnly rating={4} />
                    </div>
                </div>
                <div className='mt-4'>
                    <h1 className='fs-4 mb-2'>Start Your Review</h1>
                    <RatingStar />
                </div>
            </div>
     );
}

export default Review;