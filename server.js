const express = require('express');
const { Category } = require('./models');
const { Product } = require('./models');
const ProductController = require('./controllers/ProductsController');
const CategoriesController = require('./controllers/CategoriesController');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/category', CategoriesController.create);
app.post('/product', ProductController.create);
app.get('/product', ProductController.getAll);
app.get('/product/:id', ProductController.getOne);
app.put('/product/:id', ProductController.update);
app.delete('/product/:id', ProductController.deleteOne);

app.get('/', (req, res) => res.json({ index: 'index Route' }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
