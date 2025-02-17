import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import NavBar from './component/NavBar.jsx';
import Footer from './component/Footer.jsx';
import HomePage from './component/HomePage/HomePage.jsx';
import FoodPage from './component/FoodPage/FoodPage.jsx';
import Menu from './component/FoodPage/Menu.jsx';
import Review from './component/FoodPage/Review.jsx';
import ReviewPage from './component/FoodPage/ReviewPage.jsx';


createRoot(document.getElementById('root')).render(
  
    <BrowserRouter> 
      
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/foodshow" element={<FoodPage/>}></Route>
          <Route path="/foodshow/weekly" element={<Menu/>}></Route>
          <Route path="/review" element={<ReviewPage/>}></Route>
        </Routes>
      
    </BrowserRouter>
)
