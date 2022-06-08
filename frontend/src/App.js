import './App.css'
import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from "./components/layouts/Header"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { loadUser } from "./actions/userActions"
import store from "./store"
import { useEffect, useState } from 'react';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import Payment from './components/cart/Payment';
import ConfirmOrder from './components/cart/ConfirmOrder';
import axios from 'axios';

//payment
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/cart/OrderSuccess';
import ListOrders from './components/orders/ListOrders';
import OrderDetails from './components/orders/OrderDetails';

//admin imports 
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import { useSelector } from 'react-redux';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';

function App() {

  const [stripeApiKey, setStripeApiKey] = useState("")
  const {user , loading, isAuthenticated } = useSelector(state => state.auth)

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    }

    getStripeApiKey()
  }, [])
  return (
    <Router >
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route  path="/" element={<Home />} exact />
            <Route path="/search/:keyword" element={<Home />} exact />
            <Route path="/products/:id" element={<ProductDetails />} exact />
            <Route path="/login" element={<Login/>}  exact/>
            <Route path="/register" element={<Register/>}  exact/>
            <Route path="/password/forgot" element={<ForgotPassword/>}  exact/>
            <Route path="/password/reset/:token" element={<ResetPassword/>}  exact/>
            <Route path="/me" element={<ProtectedRoute ><Profile/></ProtectedRoute>}  exact/>
            <Route path="/me/update" element={<ProtectedRoute ><UpdateProfile/></ProtectedRoute>}  exact/>
            <Route path="/password/update" element={<ProtectedRoute ><UpdatePassword/></ProtectedRoute>}  exact/>
            <Route path="/shipping" element={<ProtectedRoute ><Shipping/></ProtectedRoute>}  exact/>
            <Route path="/order/confirm" element={<ProtectedRoute ><ConfirmOrder/></ProtectedRoute>}  exact/>
            <Route path="/success" element={<ProtectedRoute ><OrderSuccess/></ProtectedRoute>}  exact/>
            <Route path="/orders/me" element={<ProtectedRoute ><ListOrders/></ProtectedRoute>}  exact/>
            <Route path="/order/:id" element={<ProtectedRoute ><OrderDetails/></ProtectedRoute>}  exact/>
            <Route path="/dashboard" isAdmin={true} element={<ProtectedRoute ><Dashboard/></ProtectedRoute>}  exact/>
            <Route path="/admin/products" isAdmin={true} element={<ProtectedRoute ><ProductList/></ProtectedRoute>}  exact/>
            <Route path="/admin/orders" isAdmin={true} element={<ProtectedRoute ><OrderList/></ProtectedRoute>}  exact/>
            <Route path="/admin/users" isAdmin={true} element={<ProtectedRoute ><UsersList/></ProtectedRoute>}  exact/>
            <Route path="/admin/product" isAdmin={true} element={<ProtectedRoute ><NewProduct/></ProtectedRoute>}  exact/>
            <Route path="/admin/products/:id" isAdmin={true} element={<ProtectedRoute ><UpdateProduct/></ProtectedRoute>}  exact/>
            <Route path="/admin/order/:id" isAdmin={true} element={<ProtectedRoute ><ProcessOrder/></ProtectedRoute>}  exact/>
            <Route path="/admin/user/:id" isAdmin={true} element={<ProtectedRoute ><UpdateUser/></ProtectedRoute>}  exact/>
            <Route path="/admin/reviews" isAdmin={true} element={<ProtectedRoute ><ProductReviews/></ProtectedRoute>}  exact/>
            <Route  path="/cart" element={<Cart />} exact />

            {stripeApiKey &&      
            <Route path="/payment" 
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute>
              <Payment/>
              </ProtectedRoute>
            </Elements>
            } 
            />
          }


          </Routes>
        </div>
        {!loading && (!isAuthenticated || user.role !== 'admin') && (
          <Footer />
        )}
      </div>
    </Router>
  );
}

export default App;
