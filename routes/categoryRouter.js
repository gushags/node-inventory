// routes/categoryRouter.js

const { Router } = require('express');

const {
  getAllCategoriesControl,
} = require('../controllers/categoriesController');

const categoryRouter = Router();

categoryRouter.get('/', getAllCategoriesControl);

module.exports = categoryRouter;
