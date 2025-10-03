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
  const {
    name,
    description,
    ftype,
    collection,
    woodIds,
    quantityCnt,
    roomIds,
  } = req.body;
  // Create new furniture (name, description, collection)
  // Take the created furniture id and...
  // 1. Loop through woodIds and INSERT into furniture_inventory with quantity
  // 2. Add entry to inventory_types with furn_id and ftype
  // 3. Loop through roomIds and add to inventory_rooms w/furn_id
  const result = await db.createNewFurniture(name, description, collection);
  const furn_id = result.furn_id;
  for (let i = 0; i < woodIds.length; i++) {
    await db.createNewInventoryItem(furn_id, woodIds[i], quantityCnt[i]);
  }
  await db.createNewInventoryTypes(furn_id, ftype);
  for (let i = 0; i < roomIds.length; i++) {
    await db.createNewInventoryRooms(furn_id, roomIds[i]);
  }
  res.redirect('/');
}

module.exports = {
  getNewProductControl: catchAsyncErr(getNewProductControl),
  createNewProductControl: catchAsyncErr(createNewProductControl),
};
