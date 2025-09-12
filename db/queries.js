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

module.exports = { getAllInventory };
