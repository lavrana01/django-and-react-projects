import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import Home from './core/Home'
import Signup  from "./user/Signup";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import Signin from "./user/Signin";
import Cart from "./core/Cart";
import MyOrders from './core/MyOrders'
import Track from "./core/Track";
import ReturnOrder from "./core/ReturnOrder";
import Check from "./core/Check";


const Routers = () => {
    return(
        <Router>
        <Routes>
            <Route path='/' exact element={<Home />}></Route>
            <Route path="/signup" exact element={<Signup />}></Route>
            <Route path='/user/dashboard//*' exact element={<PrivateRoutes />}></Route>
            <Route path='/signin' exact element={<Signin />}></Route>
            <Route path='/cart' exact element={<Cart />}></Route>
            <Route path='/history' exact element={<MyOrders />}></Route>
            <Route path='/track' exact element={<Track />}></Route>
            <Route path='/return' exact element={<ReturnOrder />}></Route>
        </Routes>
        </Router>
    )
}
export default Routers;