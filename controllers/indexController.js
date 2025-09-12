// controllers/indexController.js

const db = require('../db/queries');

async function getAllInventory(req, res) {
  const inventory = await db.getAllInventory();
  res.render('index', {
    title: '1912 Inc. Inventory',
    inventory: inventory,
  });
}

module.exports = { getAllInventory };
