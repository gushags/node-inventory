// routes/newRouter.js

const { Router } = require('express');

const newRouter = Router();

newRouter.get('/', (req, res) => {
  res.render('new');
});

module.exports = newRouter;
