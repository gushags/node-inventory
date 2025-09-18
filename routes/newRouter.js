// routes/newRouter.js

const { Router } = require('express');
const {
  createNewProductControl,
  getNewProductControl,
} = require('../controllers/newController');

const newRouter = Router();

newRouter.get('/', getNewProductControl);
newRouter.post('/', createNewProductControl);

module.exports = newRouter;
