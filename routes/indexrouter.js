// routes/indexRouter.js

const { Router } = require('express');
const {
  getAllInventoryControl,
  getInventoryByCatControl,
  getInventoryByIdControl,
  updateProdQtyByIdControl,
} = require('../controllers/indexController');

const indexRouter = Router();

indexRouter.get('/', getAllInventoryControl);
indexRouter.get('/:category', getInventoryByCatControl);
indexRouter.get('/product/:id', getInventoryByIdControl);
indexRouter.post('/product/:id', updateProdQtyByIdControl);

module.exports = indexRouter;
