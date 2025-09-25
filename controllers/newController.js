// controllers/newController.js

const db = require('../db/queries');
const catchAsyncErr = require('../utils/catchAsyncErr');

async function getNewProductControl(req, res) {
  const wood = await db.getAllWood();
  const ftypes = await db.getAllTypes();
  const collections = await db.getAllCollections();
  const rooms = await db.getAllRooms();
  res.render('new', {
    title: 'New Product',
    wood: wood,
    ftypes: ftypes,
    collections: collections,
    rooms: rooms,
  });
}

async function createNewProductControl(req, res) {
  const { name, description, quantity, wood, ftype, room, collection } =
    req.body;
  const result = await db.createNewFurniture(name, description);
  const furn_id = result.furn_id;
  await db.createNewProduct(furn_id, quantity, wood, ftype, room, collection);
  res.redirect('/');
}

module.exports = {
  getNewProductControl: catchAsyncErr(getNewProductControl),
  createNewProductControl: catchAsyncErr(createNewProductControl),
};
