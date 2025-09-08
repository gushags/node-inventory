// routes/indexrouter.js

const { Router } = require('express');

const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  res.render('index', {
    title: 'Node Inventory',
  });
});
module.exports = indexRouter;
