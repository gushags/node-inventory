// routes/indexRouter.js

const { Router } = require('express');
const { getAllInventory } = require('../controllers/indexController');

const indexRouter = Router();

indexRouter.get('/', getAllInventory);

module.exports = indexRouter;
