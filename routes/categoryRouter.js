// routes/categoryRouter.js

const { Router } = require('express');

const {
  getAllCategoriesControl,
  updateCollectionControl,
  updateWoodControl,
  updateFtypeControl,
  updateRoomControl,
  // deleteCollectionByIdControl,
  // deleteWoodByIdControl,
  // deleteFtypeByIdControl,
  // deleteRoomByIdControl,
  createNewCollectionControl,
  createNewWoodControl,
  createNewFtypeControl,
  createNewRoomControl,
} = require('../controllers/categoriesController');

const categoryRouter = Router();

categoryRouter.get('/', getAllCategoriesControl);
categoryRouter.post('/collection/:collection_id', updateCollectionControl);
categoryRouter.post('/wood/:wood_id', updateWoodControl);
categoryRouter.post('/ftype/:ftype_id', updateFtypeControl);
categoryRouter.post('/room/:room_id', updateRoomControl);

categoryRouter.post('/new/collection', createNewCollectionControl);
categoryRouter.post('/new/wood', createNewWoodControl);
categoryRouter.post('/new/ftype', createNewFtypeControl);
categoryRouter.post('/new/room', createNewRoomControl);

// categoryRouter.delete(
//   '/delete/collection/:collection_id',
//   deleteCollectionByIdControl
// );
// categoryRouter.delete('/delete/wood/:wood_id', deleteWoodByIdControl);
// categoryRouter.delete('/delete/ftype/:ftype_id', deleteFtypeByIdControl);
// categoryRouter.delete('/delete/room/:room_id', deleteRoomByIdControl);

module.exports = categoryRouter;
