import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/favorites')
      .then(response => response.json())
      .then(data => setFavorites(data))
      .catch(err => console.log(err));
  }, []);

  const removeFromFavorites = (id) => {
    fetch(`http://localhost:5000/favorites/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete the item');
        }
        return response.json();
      })
      .then(() => setFavorites(favorites.filter(item => item.id !== id)))
      .catch(err => console.log(err));
  };

  const addToCart = (product) => {
    fetch('http://localhost:5000/cart')
      .then(response => response.json())
      .then(cartItems => {
        const existingProduct = cartItems.find(item => item.id === product.id);
        if (existingProduct) {
          fetch(`http://localhost:5000/cart/${product.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: existingProduct.quantity + 1 })
          })
            .then(response => response.json())
            .then(() => alert(`${product.name} добавлен в корзину!`))
            .catch(err => console.log(err));
        } else {
          product.quantity = 1;
          fetch('http://localhost:5000/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
          })
            .then(response => response.json())
            .then(() => alert(`${product.name} добавлен в корзину!`))
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Избранное</h1>
      {favorites.length > 0 ? (
        <ProductList products={favorites} addToCart={addToCart} removeFromFavorites={removeFromFavorites} />
      ) : (
        <p>Ваш список избранных товаров пуст</p>
      )}
    </div>
  );
};

export default Favorite;
