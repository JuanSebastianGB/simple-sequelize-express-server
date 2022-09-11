import AppController from '../controllers/AppController';

const express = require('express');
const CategoriesController = require('../controllers/CategoriesController');
const ProductsController = require('../controllers/ProductsController');

const router = express.Router();

router.get('/random', AppController.randomNumber);
router.get('/status', AppController.getStatus);
router.post('/category', CategoriesController.create);
router.post('/product', ProductsController.create);
router.get('/product', ProductsController.getAll);
router.get('/product/:id', ProductsController.getOne);
router.put('/product/:id', ProductsController.update);
router.delete('/product/:id', ProductsController.deleteOne);

router.get('/', (req, res) => res.json({ index: 'index Route' }));

module.exports = router;
