// routes/categoryRouter.js

const { Router } = require('express');

const {
  getAllCategoriesControl,
  updateCollectionControl,
} = require('../controllers/categoriesController');

const categoryRouter = Router();

categoryRouter.get('/', getAllCategoriesControl);
categoryRouter.post('/collection/:collection_id', updateCollectionControl);

module.exports = categoryRouter;
