// routes/categoryRouter.js

const { Router } = require('express');

const categoryRouter = Router();

categoryRouter.get('/', (req, res) => {
  res.render('categories', { title: '1912 Inc. Inventory: Categories' });
});

module.exports = categoryRouter;
