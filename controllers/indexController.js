// controllers/indexController.js

const db = require('../db/queries');
const catchAsyncErr = require('../utils/catchAsyncErr');

async function getAllInventoryControl(req, res) {
  const inventory = await db.getAllInventory();
  const collections = await db.getAllCollections();
  const wood = await db.getAllWood();
  const ftypes = await db.getAllTypes();
  const rooms = await db.getAllRooms();

  res.render('index', {
    title: '1912 Inc. Inventory',
    collections: collections,
    wood: wood,
    ftypes: ftypes,
    rooms: rooms,
    inventory: inventory,
  });
}

async function getInventoryByCatControl(req, res) {
  const { category } = req.params;
  const inventory = await db.getInventoryByCategory(category);
  const collections = await db.getAllCollections();
  const wood = await db.getAllWood();
  const ftypes = await db.getAllTypes();
  const rooms = await db.getAllRooms();
  res.render('index', {
    title: '1912 Inc. Inventory',
    collections: collections,
    wood: wood,
    ftypes: ftypes,
    rooms: rooms,
    inventory: inventory,
  });
}

async function getInventoryByIdControl(req, res) {
  const { id } = req.params;
  console.log('id: ', id);
  const inventory = await db.getInventoryById(id);
  res.render('product', {
    title: 'Product',
    alert: null,
    inventory: inventory,
  });
}

async function updateProdQtyByIdControl(req, res) {
  const { quantity } = req.body;
  const finv_id = req.params.id;
  const inventory = await db.updateProductQuantityById(finv_id, quantity);
  res.render('product', {
    title: 'Product',
    alert: 'Product updated.',
    inventory: inventory,
  });
}

async function deleteProductByIdControl(req, res) {
  const furn_id = req.params.id;
  await db.deleteProductById(furn_id);
  res.redirect('/');
}

module.exports = {
  getAllInventoryControl: catchAsyncErr(getAllInventoryControl),
  getInventoryByCatControl: catchAsyncErr(getInventoryByCatControl),
  getInventoryByIdControl: catchAsyncErr(getInventoryByIdControl),
  updateProdQtyByIdControl: catchAsyncErr(updateProdQtyByIdControl),
  deleteProductByIdControl: catchAsyncErr(deleteProductByIdControl),
};
