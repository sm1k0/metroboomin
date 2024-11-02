import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Badge, Menu, MenuItem, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircle from '@mui/icons-material/AccountCircle';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CloseIcon from '@mui/icons-material/Close';
import logo from './metro.png'; 

const categories = [
  'Живая и свежая рыба', 'Копченая, соленая и другая рыба', 'Замороженное мясо', 'Замороженная птица', 'Мясо',
  'Натуральные продукты', 'Хлеб, лаваш, лепешки', 'Конфеты и подарочные наборы', 'Растительное масло', 'Овощи', 'Вода'
];

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/cart')
      .then(response => response.json())
      .then(data => setCartCount(data.length))
      .catch(err => console.error('Error fetching cart count:', err));

    fetch('http://localhost:5000/favorites')
      .then(response => response.json())
      .then(data => setFavoriteCount(data.length))
      .catch(err => console.error('Error fetching favorite count:', err));
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const encodedTerm = encodeURIComponent(searchTerm);
      fetch(`http://localhost:5000/products?name_like=${encodedTerm}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setSearchResults(data.slice(0, 5));
        })
        .catch(err => console.error('Error fetching search results:', err));
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleFavoriteClick = () => {
    navigate('/favorite');
  };

  const handleCategoryClick = (category) => {
    navigate(`/catalog?category=${encodeURIComponent(category)}`);
    handleDrawerClose();
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <IconButton edge="start" color="inherit" aria-label="home" onClick={() => navigate('/')}>
            <img src={logo} alt="Logo" style={{ height: '40px' }} />
          </IconButton>
          <Typography variant="h6" noWrap>
            Магазин: Москва, Ул. Ленинградское шоссе, д.71Г (м. Речной вокзал)
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <div style={{ position: 'relative', display: 'flex' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', borderRadius: '4px', backgroundColor: 'rgba(255, 255, 255, 0.15)', marginRight: '16px', marginLeft: '0', width: '100%' }}>
              <div style={{ padding: '0 16px', height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Вода, соки"
                style={{ color: 'inherit', paddingLeft: 'calc(1em + 32px)', width: '100%' }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {searchResults.length > 0 && (
                <div style={{ position: 'absolute', top: '40px', left: '0', backgroundColor: 'white', color: 'black', width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                  <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
                    {searchResults.map(result => (
                      <li key={result.id} style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                        <Link to={`/product/${result.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          {result.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <IconButton aria-label="show cart items" color="inherit" onClick={handleCartClick}>
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show favorite items" color="inherit" onClick={handleFavoriteClick}>
              <Badge badgeContent={favoriteCount} color="secondary">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <div
          role="presentation"
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
          style={{ width: '250px' }}
        >
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
          <List>
            {categories.map((text) => (
              <ListItem button key={text} onClick={() => handleCategoryClick(text)}>
                <ListItemIcon><StorefrontIcon /></ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Профиль</MenuItem>
        <MenuItem onClick={handleMenuClose}>Мои заказы</MenuItem>
      </Menu>
    </>
  );
};

export default Header;
