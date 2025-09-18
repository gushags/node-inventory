// controllers/newController.js

const db = require('../db/queries');
const catchAsyncErr = require('../utils/catchAsyncErr');

async function createNewProductControl() {
  console.log('Creating new product');
}

module.exports = {
  createNewProductControl: catchAsyncErr(createNewProductControl),
};
