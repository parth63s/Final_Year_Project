import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { showToast } from '../utils/showToast'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';



function NavBar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:5000/api/auth/logout', {
                withCredentials: true,
            });

        // Clear localStorage or any user data
            localStorage.removeItem('user');


        // Redirect to home page
            navigate('/', { state: { toast: "Logged out successfully!" } });
        } catch (err) {
            toast.error('Logout failed. Try again.', {
                position: 'top-center',
            });
            // navigate('/')
            console.error(err);
        }
    };
    return ( 
        <nav className="navbar bg-body-tertiary fixed-top" style={{backgroundColor:"black"}}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src="./media/images/logo.svg" alt="Bootstrap" width="100" height="55"/>
                    {/* <b>MOM'S Magic</b> */}
                </a>
                {/* <form className="d-flex mt-3" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form> */}
                <button className="navbar-toggler color" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end side-bar w-25" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">MOM's Magic</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/food">Food Menu</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/menu">Services</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link"  onClick={handleLogout}>LogOut</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
