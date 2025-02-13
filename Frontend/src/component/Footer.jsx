import React from 'react';


function Footer() {
    return ( 
        <div className='footer pt-4'>
            {/* <h1 className='fs-4 mb-4 mt-3 text-center'>MOM'S Magic</h1> */}
        
            <div className="row">
                <div className="col offset-1">
                    <h1 className='fs-5 mb-4'>Company</h1>
                    <p>About Us</p>
                    <p>Mom's magic Corporate</p>
                    <p>Careers</p>
                    <p>Team</p>
                    <p>Mom's magic One</p>
                    <p>Mom's magic Instamart</p>
                    <p>Mom's magic Dineout</p>
                    <p>Mom's magic Genie</p>
                    <p>Minis</p>
                </div>

                <div className="col ">
                    <h1 className='fs-5 mb-4'>Contact us</h1>
                    <p>Help & Support</p>
                    <p>Partner with us</p>
                    <p>Ride with us</p>
                    <h1 className='fs-5 mt-4 mb-4'>Legal</h1>
                    <p>Terms & Conditions</p>
                    <p>Cookie Policy</p>
                    <p>Privacy Policy</p>
                </div>

                <div className="col">
                    <h1 className='fs-5 mb-4'>Avaiable in:</h1>
                    <p>Vadodara</p>
                    <p>Surat</p>
                </div>
                <div className="col">
                    <h1 className='fs-5 mb-4'>Life at Mom's magic</h1>
                    <p>Explore with Mom's magic</p>
                    <p>Mom's magic News</p>
                    <p>Snackables</p>
                    <h1 className='fs-5 mt-5 mb-4'>Social Links</h1>
                    <div className='row '>
                        <i class="fa-brands fa-linkedin col-2"></i>
                        <i class="fa-brands fa-instagram col-2"></i>
                        <i class="fa-brands fa-facebook-f col-2"></i>
                        <i class="fa-brands fa-twitter col-2"></i>
                    </div>
                </div>
            </div>
            <hr className='mx-4'/>
            <div className="row text-center">
                <p className='text-center'>
                &copy; 2010 - 2024, Not MOM'S Magic Ltd. All rights reserved.
                </p>
            </div>
        </div>
     );
}

export default Footer;