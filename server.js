const express = require('express');
const { Category } = require('./models');
const { Product } = require('./models');
const ProductController = require('./controllers/ProductsController');
const CategoriesController = require('./controllers/CategoriesController');
const router = require('./routes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
