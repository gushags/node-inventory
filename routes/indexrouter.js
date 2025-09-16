// routes/indexRouter.js

const { Router } = require('express');
const {
  getAllInventory,
  getInventoryByCategory,
  getInventoryById,
} = require('../controllers/indexController');

const indexRouter = Router();

indexRouter.get('/', getAllInventory);
indexRouter.get('/:category', getInventoryByCategory);
indexRouter.get('/product/:id', getInventoryById);

module.exports = indexRouter;
