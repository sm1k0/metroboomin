import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Fetch cart items from API or local storage
    axios.get('http://localhost:5000/cart').then(response => {
      setCart(response.data);
      calculateTotalPrice(response.data);
    });
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  };

  return { cart, totalPrice };
};
