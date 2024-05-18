import React from 'react';
import Navbar from './components/navbar/Navbar';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import Order from './pages/placeOrder/Order';

const App = () => {
  return (
    <div className='app'>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<Order />} />
      </Routes>
    </div>
  )
}

export default App;
