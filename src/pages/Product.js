import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Grid, Button, IconButton } from '@mui/material';
import { Favorite, ShoppingCart } from '@mui/icons-material';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => setError(error));
  }, [id]);

  const handleAddToFavorites = () => {
    axios.post('http://localhost:5000/favorites', product)
      .then(() => alert(`${product.name} добавлен в избранное!`))
      .catch(error => alert('Ошибка при добавлении в избранное'));
  };

  const handleAddToCart = () => {
    axios.post('http://localhost:5000/cart', product)
      .then(() => alert(`${product.name} добавлен в корзину!`))
      .catch(error => alert('Ошибка при добавлении в корзину'));
  };

  if (error) return <div>Error loading product: {error.message}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <Card style={{ maxWidth: '600px', margin: 'auto' }}>
        <CardMedia
          component="img"
          alt={product.name}
          height="400"
          image={product.image}
          title={product.name}
          style={{ objectFit: 'contain', paddingTop: '10px' }}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Категория: {product.category}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Цена: {product.price}₽
          </Typography>
          <Grid container spacing={2} alignItems="center">
            
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleAddToFavorites}>
                Добавить в избранное
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={handleAddToCart}>
                Добавить в корзину
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductPage;
