import React from 'react';
import { Tooltip, tooltipClasses, styled } from "@mui/material";
import { IoLocationOutline } from "react-icons/io5";
import Review from './Review';
import Subscriptions from './Subscriptions';

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 12,
        fontWeight: 'bold',
        padding: "8px 12px",
    },
}));

function ShowFood() {
    return (
        <div className="container py-4">
            <div className="row g-4 align-items-center">
                {/* Text Content */}
                <div className="col-md-6">
                    <h1 className='fs-3 fw-bold'>Delicious Food Place</h1>
                    <p className='fs-5 text-muted'>
                        4.2 <i className="fa-solid fa-star text-warning"></i> Reviews
                    </p>
                    <LightTooltip 
                        title="Near Gayatri School, Gotri, Gotri Road, Vadodara - 390021 (Gotri Lake)" 
                        placement="right"
                    >
                        <p className="fs-6 text-primary d-inline">
                            <IoLocationOutline /> Gotri Road, Vadodara
                        </p>
                    </LightTooltip>
                    <span className='fs-6 text-muted d-block mt-2'>9 Years in Business</span>
                </div>

                {/* Image Gallery */}
                <div className="col-md-6">
                    <div className='row g-2'>
                        <div className='col-6'><img src="./media/images/Food1.jpg" className="img-fluid rounded" alt="Food1" /></div>
                        <div className='col-6'><img src="./media/images/Food2.jpg" className="img-fluid rounded" alt="Food2" /></div>
                        <div className='col-6'><img src="./media/images/Food3.jpg" className="img-fluid rounded" alt="Food3" /></div>
                        <div className='col-6'><img src="./media/images/Food4.jpg" className="img-fluid rounded" alt="Food4" /></div>
                    </div>
                </div>
            </div>

            {/* Subscription Plans and Menu */}
            <Subscriptions />

            {/* Reviews Section */}
            <Review />
        </div>
    );
}

export default ShowFood;
