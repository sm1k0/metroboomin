import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import emailjs from 'emailjs-com';
import { Container, Typography, Button, TextField, Checkbox, FormControlLabel } from '@mui/material';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [email, setEmail] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/cart')
      .then(response => response.json())
      .then(data => setCart(data))
      .catch(err => console.log(err));
  }, []);

  const removeFromCart = (id) => {
    fetch(`http://localhost:5000/cart/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete the item');
        }
        return response.json();
      })
      .then(() => setCart(cart.filter(item => item.id !== id)))
      .catch(err => console.log(err));
  };

  const addToFavorite = (product) => {
    fetch('http://localhost:5000/favorites')
      .then(response => response.json())
      .then(favorites => {
        const existingFavorite = favorites.find(item => item.id === product.id);
        if (!existingFavorite) {
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
        } else {
          alert(`${product.name} уже в избранном!`);
        }
      })
      .catch(err => console.log(err));
  };

  const updateQuantity = (id, quantity) => {
    fetch(`http://localhost:5000/cart/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity: Number(quantity) })
    })
      .then(response => response.json())
      .then(updatedProduct => {
        setCart(cart.map(item => (item.id === id ? updatedProduct : item)));
      })
      .catch(err => console.log(err));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCaptchaChange = (e) => {
    setCaptchaVerified(e.target.checked);
  };

  const handleOrder = () => {
    if (!captchaVerified) {
      alert('Please verify that you are not a robot');
      return;
    }

    const orderDetails = cart.map(item => `${item.name}: ${item.quantity} шт.`).join('\n');
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const templateParams = {
      from_email: 'your-email@gmail.com', // Замените на вашу почту, с которой будут отправляться письма
      to_email: email,
      subject: 'Your Order Details',
      message: `Your order has been placed:\n\n${orderDetails}\n\nTotal Price: ${totalPrice}₽`
    };

    emailjs.send('service_dkqu3qn', 'template_0hj1kor', templateParams, 'gTed2ZbA9jtYwTbZ2')
      .then((response) => {
        alert('Order details have been sent to your email.');
      })
      .catch((error) => {
        alert('Error sending email: ' + error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Корзина
      </Typography>
      {cart.length > 0 ? (
        <div>
          <ProductList products={cart} addToCart={() => {}} addToFavorite={addToFavorite} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
          <Typography variant="h5" gutterBottom>
            Total: {cart.reduce((total, item) => total + item.price * item.quantity, 0)} ₽
          </Typography>
          <TextField
            label="Ваш Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={handleEmailChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={captchaVerified}
                onChange={handleCaptchaChange}
                color="primary"
              />
            }
            label="Я не робот"
          />
          <Button variant="contained" color="primary" onClick={handleOrder} disabled={!captchaVerified}>
            Оформить заказ
          </Button>
        </div>
      ) : (
        <Typography variant="body1">
          Ваша корзина пуста
        </Typography>
      )}
    </Container>
  );
};

export default Cart;
