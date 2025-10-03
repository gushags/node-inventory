// routes/indexRouter.js

const { Router } = require('express');
const {
  getAllInventoryControl,
  getInventoryByCatControl,
  getInventoryByIdControl,
  getProductByIdControl,
  updateProdByIdControl,
  deleteProductByIdControl,
  deleteProductByFinvIdControl,
} = require('../controllers/indexController');

const indexRouter = Router();

indexRouter.get('/', getAllInventoryControl);
indexRouter.get('/0&0&0&0', (req, res) => {
  res.redirect('/');
});
indexRouter.get('/:category', getInventoryByCatControl);
// why are these different from here...
indexRouter.get('/product/:id', getInventoryByIdControl);
indexRouter.get('/update/:id', getProductByIdControl);
// ...to here? Both of them need to send the same id. One
// is able to update, other is just 'read'.
indexRouter.post('/product/:id', updateProdByIdControl);
indexRouter.delete('/delete/:id', deleteProductByIdControl);
indexRouter.delete('/delete/prod/:id', deleteProductByFinvIdControl);

module.exports = indexRouter;
