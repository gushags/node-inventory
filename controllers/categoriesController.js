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

async function updateWoodControl(req, res) {
  const name = req.body.wood;
  const id = req.params.wood_id;
  await db.updateWood(name, id);
  const collections = await db.getAllCollections();
  const wood = await db.getAllWood();
  const ftypes = await db.getAllTypes();
  const rooms = await db.getAllRooms();
  res.render('categories', {
    title: '1912 Inc. Inventory: Categories',
    updated: 'The Wood category has been updated.',
    collections: collections,
    wood: wood,
    ftypes: ftypes,
    rooms: rooms,
  });
}

async function updateFtypeControl(req, res) {
  const name = req.body.ftype;
  const id = req.params.ftype_id;
  await db.updateFtype(name, id);
  const collections = await db.getAllCollections();
  const wood = await db.getAllWood();
  const ftypes = await db.getAllTypes();
  const rooms = await db.getAllRooms();
  res.render('categories', {
    title: '1912 Inc. Inventory: Categories',
    updated: 'Furniture Types have been updated.',
    collections: collections,
    wood: wood,
    ftypes: ftypes,
    rooms: rooms,
  });
}

async function updateRoomControl(req, res) {
  const name = req.body.room;
  const id = req.params.room_id;
  await db.updateRoom(name, id);
  const collections = await db.getAllCollections();
  const wood = await db.getAllWood();
  const ftypes = await db.getAllTypes();
  const rooms = await db.getAllRooms();
  res.render('categories', {
    title: '1912 Inc. Inventory: Categories',
    updated: 'The Room category has been updated.',
    collections: collections,
    wood: wood,
    ftypes: ftypes,
    rooms: rooms,
  });
}
module.exports = {
  getAllCategoriesControl: catchAsyncErr(getAllCategoriesControl),
  updateCollectionControl: catchAsyncErr(updateCollectionControl),
  updateWoodControl: catchAsyncErr(updateWoodControl),
  updateFtypeControl: catchAsyncErr(updateFtypeControl),
  updateRoomControl: catchAsyncErr(updateRoomControl),
};
