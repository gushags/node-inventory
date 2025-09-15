// db/queries.js

const pool = require('./pool');

async function getAllInventory() {
  const SQL_ALL_INVENTORY = `
    SELECT furn_name, wood_name, ftype_name, collection_name, room_name, finv_sku, finv_quantity FROM furniture_inventory
    JOIN furniture
        ON furniture.furn_id = furniture_inventory.furn_id
    JOIN wood
        ON wood.wood_id = furniture_inventory.wood_id
    JOIN furniture_types
        ON furniture_types.ftype_id = furniture_inventory.ftype_id
    JOIN rooms
        ON rooms.room_id = furniture_inventory.room_id
    JOIN collections
        ON collections.collection_id = furniture_inventory.collection_id
    ORDER BY collection_name, furn_name;
    `;
  const { rows } = await pool.query(SQL_ALL_INVENTORY);
  return rows;
}

async function getInventoryByCategory(category) {
  let catArray = [];
  catArray = category.split('&');
  catArray.forEach((element, index, array) => {
    if (array[index] === '0') {
      array[index] = null;
    }
  });
  console.log(catArray);
  const INVENTORY_BY_CATEGORY = `
  SELECT furn_name, wood_name, ftype_name, collection_name, room_name, finv_sku, finv_quantity FROM furniture_inventory
      JOIN furniture
          ON furniture.furn_id = furniture_inventory.furn_id
      JOIN wood
          ON wood.wood_id = furniture_inventory.wood_id
      JOIN furniture_types
          ON furniture_types.ftype_id = furniture_inventory.ftype_id
      JOIN rooms
          ON rooms.room_id = furniture_inventory.room_id
      JOIN collections
          ON collections.collection_id = furniture_inventory.collection_id
      WHERE
          ($1::text IS NULL OR collection_name = $1::text)
          AND ($2::text IS NULL OR wood_name = $2::text)
          AND ($3::text IS NULL OR ftype_name = $3::text)
          AND ($4::text IS NULL OR room_name = $4::text)
      ORDER BY collection_name, furn_name
  `;
  const { rows } = await pool.query(INVENTORY_BY_CATEGORY, [
    catArray[0],
    catArray[1],
    catArray[2],
    catArray[3],
  ]);
  return rows;
}

module.exports = { getAllInventory, getInventoryByCategory };
