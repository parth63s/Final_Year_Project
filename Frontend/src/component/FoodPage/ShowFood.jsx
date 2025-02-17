import React from 'react';
import { MdLocationPin } from "react-icons/md";
import {Tooltip ,tooltipClasses, styled} from "@mui/material";
import { IoLocationOutline } from "react-icons/io5";
import Review from './Review';

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
      fontWeight:'bold',
    },
  }));
 
function ShowFood() {
    return ( 
        <>
            <div className="container">
                <div className="row row-cols-1 row-cols-lg-2 row-col-md-2">
                    <div className="col text-height order-md-2 order-lg-1 order-2">
                        <h1 className='fs-3 '>tital</h1>
                        <p className='fs-5 review-food'>4.2 <i class="fa-solid fa-star"></i> reviews</p>
                        <LightTooltip title="Near Gayatri School, Gotri, Gotri Road, Vadodara - 390021 (Gotri Lake)" placement="right">
                            <a className="fs-6 location"><IoLocationOutline /> Gotri Road, Vadodara</a>
                        </LightTooltip>
                        <span className='fs-6'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 9 Years in Business</span>
                        <div className="d-grid gap-2 d-md-block mt-2">
                            <a className="btn " type="button" href='foodshow/weekly'>Weekly</a>
                            <a className="btn " type="button" href='/monthly'>Monthly</a>
                        </div>
                    </div>
                    <div className="col mb-4 order-md-1 order-lg-2 order-1">
                        <div className='row'>
                            <img src="./media/images/Food1.jpg" className="card-img-top show-page-img col-6" alt="..."/>
                            <img src="./media/images/Food2.jpg" className="card-img-top show-page-img col-6" alt="..."/> 
                        </div>
                        <div className='row'>
                            <img src="./media/images/Food3.jpg" className="card-img-top show-page-img col" alt="..."/>
                            <img src="./media/images/Food4.jpg" className="card-img-top show-page-img col" alt="..."/>
                        </div>
                    </div>

                    <Review/>
                </div>
            </div>
        </>
     );
}

export default ShowFood;

