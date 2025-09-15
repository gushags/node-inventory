// routes/indexRouter.js

const { Router } = require('express');
const {
  getAllInventory,
  getInventoryByCategory,
} = require('../controllers/indexController');

const indexRouter = Router();

indexRouter.get('/', getAllInventory);
indexRouter.get('/:category', getInventoryByCategory);

module.exports = indexRouter;
