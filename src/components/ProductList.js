import React from 'react';
import { Grid, Container } from '@mui/material';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

const ProductList = ({ products, addToCart, addToFavorite, removeFromCart, updateQuantity, removeFromFavorites }) => {
  return (
    <Container>
      <Grid container spacing={2} justifyContent="center">
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={2.4}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProductCard
                product={product}
                addToCart={addToCart}
                addToFavorite={addToFavorite}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                removeFromFavorites={removeFromFavorites}
              />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
