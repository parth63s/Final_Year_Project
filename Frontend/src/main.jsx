import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css'
import HomePage from './component/HomePage/HomePage.jsx';
import FoodPage from './component/FoodPage/FoodPage.jsx';
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

import OrderPage from './component/FoodPage/OrderPage.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import ProfilePage from './component/ProfilePage.jsx';
import SubscriptionShowPage from './component/FoodPage/SubscriptionShowPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';


createRoot(document.getElementById('root')).render(
  
    <BrowserRouter> 
        <AuthProvider>
                <ToastContainer />
                <Routes>
                    <Route element={<ProtectedRoute allowedRoles={['customer', 'service']} />}>
                        <Route path="/order" element={<OrderPage />} />
                        <Route path="/showsubscription" element={<SubscriptionShowPage />} />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['customer', 'service', 'delivery']} />}>
                        <Route path="/profile" element={<ProfilePage />} />
                    </Route>
                    
                <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
                    <Route path="/customer" element={<HomePage />} />
                    <Route path="/foodshow/:id" element={<FoodPage/>}></Route>
                    <Route path="/review/:id" element={<ReviewPage/>}></Route>
                    <Route path="/foodshow/:id/subscribe" element={<FormPage/>}></Route>
                    {/* <Route path="/order" element={<OrderPage role="customer"/>}></Route> */}

                </Route>
                {/* <Route path="/customer" element={<HomePage/>}></Route> */}
                <Route element={<ProtectedRoute allowedRoles={['delivery']} />}>
                    <Route path="/delivery" element={<DeliveryDashboard/>} ></Route>
                </Route>
                
                <Route element={<ProtectedRoute allowedRoles={['service']} />}>
                    {/* <Route path="/order" element={<OrderPage role="service"/>}></Route> */}
                    <Route path="/service" element={<ServiceProviderDashboard />} />
                    <Route path="/service/addPlan" element={<AddPlanForm/>}></Route>
                </Route>

                <Route path="/" element={<MainHomePage/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
                {/* <Route path="/*" element={<h1>page is not</h1>}></Route> */}
                <Route path="/*" element={<NotFoundPage />} />

                </Routes>
      
        </AuthProvider>
    </BrowserRouter>
)
