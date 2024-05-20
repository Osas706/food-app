import React, { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Order from "./pages/placeOrder/Order";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : ''}

      <div className="app">
        <Navbar  setShowLogin={setShowLogin} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
