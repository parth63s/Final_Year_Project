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
import MainHomePage from './component/landing_page/MainHomePage.jsx';
import FormPage from './component/FoodPage/FormPage.jsx';
import Login from './component/auth/Login.jsx';
import Register from './component/auth/Register.jsx';
import DeliveryDashboard from './component/delivery/DeliveryPage.jsx';
import ServiceProviderDashboard from './component/ServiceProvider/ServiceProviderDashboard.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './utils/ProtectedRoute.jsx';
import AddPlanForm from './component/ServiceProvider/PlanForm.jsx';
import FoodSubscription from './component/FoodPage/Sub.jsx';

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter> 
        
          <ToastContainer />
        <Routes>
          <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
              <Route path="/customer" element={<HomePage />} />
              <Route path="/foodshow/:id" element={<FoodPage/>}></Route>
              <Route path="/foodshow/weekly" element={<Menu/>}></Route>
              <Route path="/review/:id" element={<ReviewPage/>}></Route>
              <Route path="/foodshow/:id/subscribe" element={<FormPage/>}></Route>
          </Route>
          {/* <Route path="/customer" element={<HomePage/>}></Route> */}
          <Route element={<ProtectedRoute allowedRoles={['delivery']} />}>
              <Route path="/delivery" element={<DeliveryDashboard/>} ></Route>
          </Route>
          
          <Route element={<ProtectedRoute allowedRoles={['service']} />}>
              <Route path="/service" element={<ServiceProviderDashboard />} />
              <Route path="/service/addPlan" element={<AddPlanForm/>}></Route>
          </Route>

          <Route path="/" element={<MainHomePage/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/s" element={<FoodSubscription/>}></Route>
        </Routes>
      
    </BrowserRouter>
)
