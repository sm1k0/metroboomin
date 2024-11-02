import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../components/ProductList';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const category = decodeURIComponent(searchParams.get('category') || '');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:5000/products');
      const data = await response.json();
      setProducts(data);

      if (category) {
        setFilteredProducts(data.filter(product => product.category === category));
      } else {
        setFilteredProducts(data);
      }
    };

    fetchProducts();
  }, [category]);

  const addToCart = (product) => {
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
  };

  const addToFavorite = (product) => {
    fetch('http://localhost:5000/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(() => alert(`${product.name} добавлен в избранное!`))
    .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Catalog</h1>
      <ProductList products={filteredProducts} addToCart={addToCart} addToFavorite={addToFavorite} />
    </div>
  );
};

export default Catalog;
