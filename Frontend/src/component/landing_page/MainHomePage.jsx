import React from 'react';
import NavBar from './NavBar';
import Footer from '../Footer';
import Hero from './Hero';
import About from './About';
import Body from './Body';
import Use from './Use';
import { showToast } from '../../utils/showToast'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function MainHomePage() {
    const location = useLocation();

    useEffect(() => {
        if (location.state?.toast) {
            showToast(location.state.toast, "success");
        }
    }, [location.state]); 

    return (
        <>  
            <NavBar/>
            <div data-bs-spy="scroll" data-bs-smooth-scroll="true">
                <Hero value="item-1"/>
                <Body value="item-2"/>
                <About value="item-3"/>
                <Use/>
                <Footer value="item-4"/>
            </div>
        </>
        
     );
}

export default MainHomePage;