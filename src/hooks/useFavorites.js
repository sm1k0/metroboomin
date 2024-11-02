import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch favorite items from API or local storage
    axios.get('http://localhost:5000/favorites').then(response => {
      setFavorites(response.data);
    });
  }, []);

  return { favorites };
};
