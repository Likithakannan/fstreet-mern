import './App.css';
import Home from './screens/Home';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer.js';
import MyOrders from './screens/MyOrders.js';

function App() {
  return <CartProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/creatuser" element={<Signup />} />
          <Route exact path="/myorder" element={<MyOrders />} />
        </Routes>
      </Router>
    </CartProvider>;
}

export default App;
