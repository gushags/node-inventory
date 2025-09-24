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
  const name = req.body.collection;
  const id = req.params.collection_id;
  await db.updateCollection(name, id);
  await renderCategories(res, 'Collections have been updated.');
}

async function updateWoodControl(req, res) {
  const name = req.body.wood;
  const id = req.params.wood_id;
  await db.updateWood(name, id);
  await renderCategories(res, 'The Wood category has been updated.');
}

async function updateFtypeControl(req, res) {
  const name = req.body.ftype;
  const id = req.params.ftype_id;
  await db.updateFtype(name, id);
  await renderCategories(res, 'Furniture Types have been updated.');
}

async function updateRoomControl(req, res) {
  const name = req.body.room;
  const id = req.params.room_id;
  await db.updateRoom(name, id);
  await renderCategories(res, 'The Room category has been updated.');
}

async function deleteCollectionByIdControl(req, res) {
  const id = req.params.collection_id;
  await db.deleteCollectionById(id);
  await renderCategories(res, 'A collection has been deleted.');
}

async function deleteWoodByIdControl(req, res) {
  const id = req.params.wood_id;
  await db.deleteWoodById(id);
  await renderCategories(res, 'A wood has been deleted.');
}

async function deleteFtypeByIdControl(req, res) {
  const id = req.params.ftype_id;
  await db.deleteFtypeById(id);
  await renderCategories(res, 'A furniture type has been deleted.');
}

async function deleteRoomByIdControl(req, res) {
  const id = req.params.room_id;
  await db.deleteRoomById(id);
  await renderCategories(res, 'A room category has been deleted.');
}

module.exports = {
  getAllCategoriesControl: catchAsyncErr(getAllCategoriesControl),
  updateCollectionControl: catchAsyncErr(updateCollectionControl),
  updateWoodControl: catchAsyncErr(updateWoodControl),
  updateFtypeControl: catchAsyncErr(updateFtypeControl),
  updateRoomControl: catchAsyncErr(updateRoomControl),
  deleteCollectionByIdControl: catchAsyncErr(deleteCollectionByIdControl),
  deleteWoodByIdControl: catchAsyncErr(deleteWoodByIdControl),
  deleteFtypeByIdControl: catchAsyncErr(deleteFtypeByIdControl),
  deleteRoomByIdControl: catchAsyncErr(deleteRoomByIdControl),
};
