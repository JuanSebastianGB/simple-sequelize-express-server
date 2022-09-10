const express = require('express');
const { Category } = require('./models');
const { Product } = require('./models');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const createCategory = (req, res) => {
  console.log(req.body);
  Category.create(req.body)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
};

const createProduct = (req, res) => {
  console.log(req.body);
  Product.create(req.body)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
};

const showProducts = (req, res) => {
  const attributes = ['description'];
  Product.findAll({ include: { model: Category, attributes } })
    .then((products) => res.json({ products }))
    .catch((err) => res.json({ err }));
};

const showProduct = (req, res) => {
  const { id } = req.params;
  Product.findAll({ where: { id }, include: [{ model: Category }] })
    .then((response) => res.json({ response }))
    .catch((err) => res.status(401).json({ err }));
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  Product.destroy({ where: { id } })
    .then((response) => res.json({ response }))
    .catch((err) => res.json({ err }));
};

const editProduct = (req, res) => {
  const { id } = req.params;
  Product.update(req.body, { where: { id } })
    .then((response) => res.json({ response }))
    .catch((err) => res.json({ err }));
};

app.post('/category', createCategory);
app.post('/product', createProduct);
app.get('/product', showProducts);
app.get('/product/:id', showProduct);
app.put('/product/:id', editProduct);
app.delete('/product/:id', deleteProduct);

app.get('/', (req, res) => res.json({ index: 'index Route' }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
