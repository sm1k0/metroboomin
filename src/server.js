const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/send-email', (req, res) => {
  const { email, cart, total } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'youmy0849@gmail.com',
      pass: 'Mastermode201'
    }
  });

  let mailOptions = {
    from: 'youmy0849@gmail.com',
    to: email,
    subject: 'Ваш заказ оформлен',
    text: `Ваш заказ:\n${cart.map(item => `${item.name} - ${item.price}₽ x ${item.quantity}`).join('\n')}\n\nИтоговая стоимость: ${total}₽`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.send('Email sent: ' + info.response);
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
