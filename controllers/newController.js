// controllers/newController.js

const db = require('../db/queries');
const catchAsyncErr = require('../utils/catchAsyncErr');

async function getNewProductControl(req, res) {
  const wood = await db.getAllWood();
  const ftypes = await db.getAllTypes();
  const collections = await db.getAllCollections();
  const rooms = await db.getAllRooms();
  res.render('new', {
    wood: wood,
    ftypes: ftypes,
    collections: collections,
    rooms: rooms,
  });
}

async function createNewProductControl(req, res) {
  console.log('Does nothing yet.');
}

module.exports = {
  getNewProductControl: catchAsyncErr(getNewProductControl),
  createNewProductControl: catchAsyncErr(createNewProductControl),
};
