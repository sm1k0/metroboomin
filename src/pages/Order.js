// src/pages/Order.js
import React, { useState } from 'react';

const Order = () => {
  const [orderFailed, setOrderFailed] = useState(false);

  // eslint-disable-next-line
  const handleOrderSubmit = () => {
    // Ваш код для обработки заказа
  };

  return (
    <div>
      <h1>Оформление заказа</h1>
      {/* Форма оформления заказа */}
      <button onClick={handleOrderSubmit}>Отправить заказ</button>
    </div>
  );
};

export default Order;
