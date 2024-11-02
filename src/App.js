import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Favorite from './pages/Favorite';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Order from './pages/Order';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  return (
    <Router>
      <Header />
      <main style={{ paddingBottom: '100px' }}>
        <Routes>
          <Route path="/" element={<Home cart={cart} setCart={setCart} favorites={favorites} setFavorites={setFavorites} />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/favorite" element={<Favorite favorites={favorites} setFavorites={setFavorites} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
