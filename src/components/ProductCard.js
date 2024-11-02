import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Button, Grid, Badge, TextField } from '@mui/material';
import { Favorite, Star, Delete } from '@mui/icons-material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const DiscountBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper || '#ffffff'}`,
    padding: '0 4px',
  },
}));

const ProductCard = ({ product, addToCart, addToFavorite, removeFromCart, updateQuantity, removeFromFavorites }) => {
  return (
    <Card style={{ maxWidth: 200, margin: 'auto', position: 'relative', cursor: 'pointer' }}>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <DiscountBadge badgeContent={`-${product.discount}%`} color="error">
          <CardMedia
            component="img"
            height="140"
            image={product.image}
            alt={product.name}
            style={{ objectFit: 'contain', paddingTop: '10px' }}
          />
        </DiscountBadge>
        <IconButton style={{ position: 'absolute', top: 10, right: 10 }} onClick={(e) => { e.preventDefault(); addToFavorite(product); }}>
          <Favorite />
        </IconButton>
        <CardContent>
          <Typography variant="h6" color="textSecondary" component="p" style={{ textDecoration: 'line-through' }}>
            {product.discountPrice} ₽/шт
          </Typography>
          <Typography variant="h5" color="primary" component="p">
            {product.price} ₽/шт
          </Typography>
          <Grid container alignItems="center">
            <Star color="primary" />
            <Typography variant="body2" color="textSecondary">
              {product.rating}
            </Typography>
          </Grid>
          <Typography variant="body2" color="textSecondary" component="p" noWrap>
            {product.name}
          </Typography>
        </CardContent>
      </Link>
      {updateQuantity && (
        <TextField
          type="number"
          value={product.quantity}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => updateQuantity(product.id, e.target.value)}
          label="Количество"
          variant="outlined"
          size="small"
          style={{ marginTop: '10px', width: '80px' }}
        />
      )}
      <Button variant="contained" color="primary" style={{ margin: '5px', width: 'calc(100% - 10px)' }} onClick={(e) => { e.preventDefault(); addToCart(product); }}>
        В корзину
      </Button>
      {removeFromCart && (
        <Button variant="contained" color="secondary" style={{ margin: '5px', width: 'calc(100% - 10px)' }} onClick={(e) => { e.preventDefault(); removeFromCart(product.id); }}>
          Удалить
        </Button>
      )}
      {removeFromFavorites && (
        <Button variant="contained" color="secondary" style={{ margin: '5px', width: 'calc(100% - 10px)' }} onClick={(e) => { e.preventDefault(); removeFromFavorites(product.id); }}>
          Удалить из избранного
        </Button>
      )}
    </Card>
  );
};

export default ProductCard;
