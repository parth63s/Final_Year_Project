import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { useContext } from 'react';
import { OnlineStatusContext } from './OnlineStatusContext';

function NavBar() {
    const { isOnline, toggleOnline } = useContext(OnlineStatusContext);

    return ( 
        <nav className="navbar bg-body-tertiary delivery-color fixed-top" style={{backgroundColor:"black"}}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <h4 className='delivery-NavBar'><DeliveryDiningIcon sx={{ mr: 2 }}/> Delivery</h4>
                    
                    
                    {/* <img src="./media/images/logo.svg" alt="Bootstrap" width="100" height="55"/> */}
                </a>
                <div>

                    <button
                        className={`btn ${isOnline ? "btn-success" : "btn-danger"} me-2 shadow px-4`}
                        onClick={toggleOnline}
                        >
                        {isOnline ? "Online" : "Offline"}
                    </button>
                    <button className="navbar-toggler color " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon "></span>
                    </button>
                </div>
                <div className="offcanvas offcanvas-end side-bar w-25" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">MOM's Magic</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/profile">profile</Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link className="nav-link" to="/menu">Services</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/logout">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
