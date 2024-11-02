import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const categories = ['Акции', 'Алкоголь', 'Рыба, икра', 'Замороженные продукты', 'Мясо, птица', 'Хлеб', 'Чай, кофе', 'Сладости', 'Молоко, сыр', 'Бакалея', 'Овощи, фрукты', 'Вода, соки', 'Чипсы, снеки'];

  return (
    <List component="nav">
      {categories.map((text, index) => (
        <ListItem button key={index} component={Link} to={`/catalog?category=${text}`}>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  );
};

export default Sidebar;
