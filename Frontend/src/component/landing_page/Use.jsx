import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function Use() {
    return ( 
        <div className="container m-t-conatiner mb-5">
            <div className='row d-flex justify-content-center mb-5'>
                <h1 className='fs-4 text-center text-shadow'>How Easy It is</h1>
                <div className='line'></div>
            </div>
            <div className="row justify-content-center">
                <div className="col-3">
                    <div className='d-flex justify-content-center'>
                        <img className='' src="./media/images/Use_1.png" alt="" height="110" width="150"/>
                    </div>
                    <h1 className='fs-6 text-center mt-2'>Choose Meal</h1>
                    <p className='text-center opacity-50 p-2'>Easily find out the homemade food you are craving</p>
                </div>
                <div className='col-1 d-flex justify-content-center align-items-center'><KeyboardArrowRightIcon /></div>
                <div className="col-3">
                    <div className='d-flex justify-content-center'>
                            <img className='' src="./media/images/Use_2.png" alt="" height="110" width="150"/>
                    </div>
                    <h1 className='fs-6 text-center mt-2'>Choose Meal</h1>
                    <p className='text-center opacity-50 p-2'>Easily find out the homemade food you are craving</p>
                </div>
                <div className="col-1 d-flex justify-content-center align-items-center"><KeyboardArrowRightIcon /></div>
                <div className="col-3">
                    <div className='d-flex justify-content-center'>
                            <img className='' src="./media/images/Use_3.png" alt="" height="110" width="150"/>
                    </div>
                    <h1 className='fs-6 text-center mt-2'>Choose Meal</h1>
                    <p className='text-center opacity-50 p-2'>Easily find out the homemade food you are craving</p>
                </div>
            </div>
        </div>
     );
}

export default Use;