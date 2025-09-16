// routes/indexRouter.js

const { Router } = require('express');
const {
  getAllInventory,
  getInventoryByCategory,
  getInventoryById,
  updateProductQuantityById,
} = require('../controllers/indexController');

const indexRouter = Router();

indexRouter.get('/', getAllInventory);
indexRouter.get('/:category', getInventoryByCategory);
indexRouter.get('/product/:id', getInventoryById);
indexRouter.post('/product/:id', updateProductQuantityById);

module.exports = indexRouter;
