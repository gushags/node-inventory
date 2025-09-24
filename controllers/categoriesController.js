// controllers/categoriesController.js

const db = require('../db/queries');
const catchAsyncErr = require('../utils/catchAsyncErr');

async function getAllCategoriesControl(req, res) {
  const collections = await db.getAllCollections();
  const wood = await db.getAllWood();
  const ftypes = await db.getAllTypes();
  const rooms = await db.getAllRooms();
  res.render('categories', {
    title: '1912 Inc. Inventory: Categories',
    updated: '',
    collections: collections,
    wood: wood,
    ftypes: ftypes,
    rooms: rooms,
  });
}

async function updateCollectionControl(req, res) {
  const name = req.body.collection;
  const id = req.params.collection_id;
  await db.updateCollection(name, id);
  const collections = await db.getAllCollections();
  const wood = await db.getAllWood();
  const ftypes = await db.getAllTypes();
  const rooms = await db.getAllRooms();
  res.render('categories', {
    title: '1912 Inc. Inventory: Categories',
    updated: 'Collections have been updated.',
    collections: collections,
    wood: wood,
    ftypes: ftypes,
    rooms: rooms,
  });
}

module.exports = {
  getAllCategoriesControl: catchAsyncErr(getAllCategoriesControl),
  updateCollectionControl: catchAsyncErr(updateCollectionControl),
};
