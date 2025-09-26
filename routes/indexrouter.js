// routes/indexRouter.js

const { Router } = require('express');
const {
  getAllInventoryControl,
  getInventoryByCatControl,
  getInventoryByIdControl,
  getProductByIdControl,
  updateProdByIdControl,
  deleteProductByIdControl,
} = require('../controllers/indexController');

const indexRouter = Router();

indexRouter.get('/', getAllInventoryControl);
indexRouter.get('/0&0&0&0', (req, res) => {
  res.redirect('/');
});
indexRouter.get('/:category', getInventoryByCatControl);
indexRouter.get('/product/:id', getInventoryByIdControl);
indexRouter.get('/update/:id', getProductByIdControl);
indexRouter.post('/product/:id', updateProdByIdControl);
indexRouter.delete('/delete/:id', deleteProductByIdControl);

module.exports = indexRouter;
