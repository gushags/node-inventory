// routes/categoryRouter.js

const { Router } = require('express');

const {
  getAllCategoriesControl,
  updateCollectionControl,
  updateWoodControl,
  updateFtypeControl,
  updateRoomControl,
} = require('../controllers/categoriesController');

const categoryRouter = Router();

categoryRouter.get('/', getAllCategoriesControl);
categoryRouter.post('/collection/:collection_id', updateCollectionControl);
categoryRouter.post('/wood/:wood_id', updateWoodControl);
categoryRouter.post('/ftype/:ftype_id', updateFtypeControl);
categoryRouter.post('/room/:room_id', updateRoomControl);

module.exports = categoryRouter;
