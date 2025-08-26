import NavBar from '../NavBar';
import FoodCard from './FoodCard';
import Footer from '../Footer';
import { showToast } from '../../utils/showToast'
  
function HomePage(PopUp) {
    if (PopUp != undefined) {
    showToast(PopUp);
    }
    return (  
        <>
            <NavBar/>
            <FoodCard/>
            <Footer/>
        </>
     );
}

export default HomePage;