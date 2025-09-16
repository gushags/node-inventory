// controllers/indexController.js

const db = require('../db/queries');

async function getAllInventory(req, res) {
  const inventory = await db.getAllInventory();
  res.render('index', {
    title: '1912 Inc. Inventory',
    inventory: inventory,
  });
}

async function getInventoryByCategory(req, res) {
  const { category } = req.params;
  const inventory = await db.getInventoryByCategory(category);
  res.render('index', {
    title: '1912 Inc. Inventory',
    inventory: inventory,
  });
}

async function getInventoryById(req, res) {
  const { id } = req.params;
  const inventory = await db.getInventoryById(id);
  res.render('product', {
    title: 'Product',
    alert: null,
    inventory: inventory,
  });
}
async function updateProductQuantityById(req, res) {
  const { quantity } = req.body;
  const finv_id = req.params.id;
  const inventory = await db.updateProductQuantityById(finv_id, quantity);
  res.render('product', {
    title: 'Product',
    alert: 'Product updated.',
    inventory: inventory,
  });
}

module.exports = {
  getAllInventory,
  getInventoryByCategory,
  getInventoryById,
  updateProductQuantityById,
};
