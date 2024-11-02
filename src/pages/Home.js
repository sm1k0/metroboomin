import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { Container, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(err => console.log(err));
  }, []);

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

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    if (value === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === value));
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Главная страница
      </Typography>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="category-filter-label">Категория</InputLabel>
        <Select
          labelId="category-filter-label"
          value={filter}
          onChange={handleFilterChange}
          label="Категория"
        >
          <MenuItem value=""><em>Все категории</em></MenuItem>
          <MenuItem value="Живая и свежая рыба">Живая и свежая рыба</MenuItem>
          <MenuItem value="Копченая, соленая и другая рыба">Копченая, соленая и другая рыба</MenuItem>
          <MenuItem value="Замороженное мясо">Замороженное мясо</MenuItem>
          <MenuItem value="Замороженная птица">Замороженная птица</MenuItem>
          <MenuItem value="Мясо">Мясо</MenuItem>
          <MenuItem value="Натуральные продукты">Натуральные продукты</MenuItem>
          <MenuItem value="Хлеб, лаваш, лепешки">Хлеб, лаваш, лепешки</MenuItem>
          <MenuItem value="Конфеты и подарочные наборы">Конфеты и подарочные наборы</MenuItem>
          <MenuItem value="Растительное масло">Растительное масло</MenuItem>
          <MenuItem value="Овощи">Овощи</MenuItem>
          <MenuItem value="Вода">Вода</MenuItem>
          {/* Добавьте другие категории по мере необходимости */}
        </Select>
      </FormControl>
      <ProductList products={filteredProducts} addToCart={addToCart} addToFavorite={addToFavorite} />
    </Container>
  );
};

export default Home;
