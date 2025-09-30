// controllers/categoriesController.js

const db = require('../db/queries');
const catchAsyncErr = require('../utils/catchAsyncErr');

async function renderCategories(res, updatedMessage) {
  const [collections, wood, ftypes, rooms] = await Promise.all([
    db.getAllCollections(),
    db.getAllWood(),
    db.getAllTypes(),
    db.getAllRooms(),
  ]);
  res.render('categories', {
    title: '1912 Inc. Inventory: Categories',
    updated: updatedMessage,
    collections,
    wood,
    ftypes,
    rooms,
  });
}

async function getAllCategoriesControl(req, res) {
  await renderCategories(res, '');
}

async function updateCollectionControl(req, res) {
  const { action, collection } = req.body;
  const id = req.params.collection_id;
  if (action === 'update') {
    await db.updateCollection(collection, id);
    await renderCategories(res, 'Collections have been updated.');
  } else if (action === 'delete') {
    await db.deleteCollectionById(id);
    await renderCategories(res, 'A collection has been deleted.');
  } else {
    res.status(400).send('Invalid action');
  }
}

async function updateWoodControl(req, res) {
  const { action, wood } = req.body;
  const id = req.params.wood_id;
  if (action === 'update') {
    await db.updateWood(wood, id);
    await renderCategories(res, 'Wood has been updated.');
  } else if (action === 'delete') {
    await db.deleteWoodById(id);
    await renderCategories(res, 'A wood has been deleted.');
  } else {
    res.status(400).send('Invalid action');
  }
}

async function updateFtypeControl(req, res) {
  const { action, ftype } = req.body;
  const id = req.params.ftype_id;
  if (action === 'update') {
    await db.updateFtype(ftype, id);
    await renderCategories(res, 'Furniture Types have been updated.');
  } else if (action === 'delete') {
    await db.deleteFtypeById(id);
    await renderCategories(res, 'A furniture type has been deleted.');
  } else {
    res.status(400).send('Invalid action');
  }
}

async function updateRoomControl(req, res) {
  const { action, room } = req.body;
  const id = req.params.room_id;
  if (action === 'update') {
    await db.updateRoom(room, id);
    await renderCategories(res, 'Rooms have been updated.');
  } else if (action === 'delete') {
    await db.deleteRoomById(id);
    await renderCategories(res, 'A room has been deleted.');
  } else {
    res.status(400).send('Invalid action');
  }
}

async function createNewCollectionControl(req, res) {
  const name = req.body.collection;
  await db.createNewCollection(name);
  await renderCategories(res, 'The Collection category has been updated.');
}

async function createNewWoodControl(req, res) {
  const name = req.body.wood;
  await db.createNewWood(name);
  await renderCategories(res, 'The Wood category has been updated.');
}

async function createNewFtypeControl(req, res) {
  const name = req.body.ftype;
  await db.createNewFtype(name);
  await renderCategories(res, 'The Furniture Type category has been updated.');
}

async function createNewRoomControl(req, res) {
  const name = req.body.room;
  await db.createNewRoom(name);
  await renderCategories(res, 'The Room category has been updated.');
}

// async function deleteCollectionByIdControl(req, res) {
//   const id = req.params.collection_id;
//   await db.deleteCollectionById(id);
//   await renderCategories(res, 'A collection has been deleted.');
// }

// async function deleteWoodByIdControl(req, res) {
//   const id = req.params.wood_id;
//   await db.deleteWoodById(id);
//   await renderCategories(res, 'A wood has been deleted.');
// }

// async function deleteFtypeByIdControl(req, res) {
//   const id = req.params.ftype_id;
//   await db.deleteFtypeById(id);
//   await renderCategories(res, 'A furniture type has been deleted.');
// }

// async function deleteRoomByIdControl(req, res) {
//   const id = req.params.room_id;
//   await db.deleteRoomById(id);
//   await renderCategories(res, 'A room category has been deleted.');
// }

module.exports = {
  getAllCategoriesControl: catchAsyncErr(getAllCategoriesControl),
  updateCollectionControl: catchAsyncErr(updateCollectionControl),
  updateWoodControl: catchAsyncErr(updateWoodControl),
  updateFtypeControl: catchAsyncErr(updateFtypeControl),
  updateRoomControl: catchAsyncErr(updateRoomControl),
  createNewCollectionControl: catchAsyncErr(createNewCollectionControl),
  createNewWoodControl: catchAsyncErr(createNewWoodControl),
  createNewFtypeControl: catchAsyncErr(createNewFtypeControl),
  createNewRoomControl: catchAsyncErr(createNewRoomControl),
};
