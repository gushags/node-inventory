// routes/indexrouter.js

const { Router } = require('express');

const indexRouter = Router();

indexRouter.get('/', (res, req) => {
  res.render('index', {
    title: 'Node Inventory',
  });
});
module.exports = indexRouter;
