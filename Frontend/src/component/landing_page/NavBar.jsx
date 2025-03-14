import React from 'react';

function NavBar() {
    return ( 
        <nav class="navbar bg-body-tertiary mainPage " >
            <div>
                <img src="./media/images/logo.svg" alt="Bootstrap" width="70" height="55" className='image'/>
            </div>
            <div >
                <a href="#item-1" className='link'>Home</a>
                <a href="#item-2" className='link'>What We Do</a>
                <a href="#item-3" className='link'>About Us</a>
                <a href="#item-4" className='link'>Contact Us</a>
            </div>
        </nav>
     );
}

export default NavBar;