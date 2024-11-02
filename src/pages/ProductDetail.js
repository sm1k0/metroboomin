import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Card, CardContent, CardMedia, Grid, IconButton } from '@mui/material';
import { Favorite, ShoppingCart } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`).then(response => {
      setProduct(response.data);
    });
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleAddToFavorites = () => {
    // Logic for adding to favorites
    console.log(`${product.name} added to favorites`);
  };

  const handleAddToCart = () => {
    // Logic for adding to cart
    console.log(`${product.name} added to cart`);
  };

  return (
    <Container style={{ marginTop: '20px' }}>
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
            Цена: {product.price}₽
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Скидка: {product.discount}%
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <IconButton color="primary" onClick={handleAddToFavorites}>
                <Favorite />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color="secondary" onClick={handleAddToCart}>
                <ShoppingCart />
              </IconButton>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleAddToFavorites}>
                Add to Favorites
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetail;
