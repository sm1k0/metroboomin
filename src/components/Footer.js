import React from 'react';
import { Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, YouTube } from '@mui/icons-material';

const Footer = () => (
  <footer>
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6">Покупателям</Typography>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link href="#">Стать клиентом</Link></li>
            <li><Link href="#">Доставка клиентам</Link></li>
            <li><Link href="#">Подарочные сертификаты</Link></li>
            <li><Link href="#">FAQ</Link></li>
            <li><Link href="#">Рекомендательные технологии</Link></li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6">Бизнесу</Typography>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link href="#">Для магазинов</Link></li>
            <li><Link href="#">Для гостинично-ресторанного бизнеса</Link></li>
            <li><Link href="#">Для офисов</Link></li>
            <li><Link href="#">Доставка бизнесу</Link></li>
            <li><Link href="#">Сотрудничество</Link></li>
            <li><Link href="#">Тендеры</Link></li>
            <li><Link href="#">Нарушение корпоративных норм</Link></li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6">О компании</Typography>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link href="#">О METRO</Link></li>
            <li><Link href="#">Пресс-центр</Link></li>
            <li><Link href="#">Карьера</Link></li>
            <li><Link href="#">Программа METRO Potentials</Link></li>
            <li><Link href="#">Торговые центры</Link></li>
            <li><Link href="#">Собственные бренды</Link></li>
            <li><Link href="#">Наши проекты</Link></li>
            <li><Link href="#">Устойчивое развитие</Link></li>
            <li><Link href="#">Безопасность труда</Link></li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6">Контакты</Typography>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link href="tel:+78007031077">8-800-703-10-77</Link></li>
            <li><Typography>Будни: с 7 до 22</Typography></li>
            <li><Typography>Выходные: с 8 до 22</Typography></li>
            <li><Link href="#">Обратная связь</Link></li>
          </ul>
          <Typography variant="h6" style={{ marginTop: '20px' }}>Мы в соцсетях</Typography>
          <div>
            <IconButton href="#"><Facebook /></IconButton>
            <IconButton href="#"><Twitter /></IconButton>
            <IconButton href="#"><Instagram /></IconButton>
            <IconButton href="#"><LinkedIn /></IconButton>
            <IconButton href="#"><YouTube /></IconButton>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={4} style={{ marginTop: '20px' }}>
        <Grid item xs={12}>
          <Typography align="center" variant="body2" color="textSecondary">
            © METRO Cash and Carry Russia, 2024
          </Typography>
          <Typography align="center" variant="body2" color="textSecondary">
            Конфиденциальность | Правовая информация | Условия соглашения | Cookies
          </Typography>
        </Grid>
      </Grid>
    </Container>
  </footer>
);

export default Footer;
