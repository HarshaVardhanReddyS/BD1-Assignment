const express = require('express');
const { resolve } = require('path');
const cors = require('cors')

const app = express();
const port = 3010;

app.use(cors())
app.use(express.static('static'));

app.get('/', (req, res) => {
  // res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.get('/cart-total', (req, res) => {
  const newItemPrice = parseFloat(req.query.newItemPrice);
  const cartTotal = parseFloat(req.query.cartTotal);
  const total = parseFloat(newItemPrice + cartTotal);
  console.log(typeof `${total}`);
  res.send(`${total}`);
});

app.get('/membership-discount', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const isMember = parseFloat(req.query.isMember);
  const total = parseFloat(cartTotal - (cartTotal / 100) * 10);
  console.log(`${total}`);
  res.send(`${total}`);
});

app.get('/calculate-tax', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  res.send(`${(cartTotal / 100) * 5}`);
});

app.get('/estimate-delivery', (req, res) => {
  const shippingMethod = req.query.shippingMethod;
  const distance = parseFloat(req.query.distance);
  console.log(shippingMethod);
  if (shippingMethod === 'express') {
    console.log();
    res.send(`${distance / 100}`);
  } else {
    res.send(`${distance / 50}`);
  }
});

app.get('/shipping-cost', (req, res) => {
  const weight = parseFloat(req.query.weight)
  const distance = parseFloat(req.query.distance)
  res.send(`${weight * distance * 0.1}`)
})

app.get('/loyalty-points', (req, res) => {
  const purchaseAmount = parseFloat(req.query.purchaseAmount)
  res.send(`${purchaseAmount * 2}`)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
