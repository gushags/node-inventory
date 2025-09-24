// db/queries.js

const pool = require('./pool');

async function getAllInventory() {
  const SQL_ALL_INVENTORY = `
    SELECT furn_name, wood_name, ftype_name, collection_name, room_name, finv_id, finv_sku, finv_quantity FROM furniture_inventory
    LEFT JOIN furniture
        ON furniture.furn_id = furniture_inventory.furn_id
    LEFT JOIN wood
        ON wood.wood_id = furniture_inventory.wood_id
    LEFT JOIN furniture_types
        ON furniture_types.ftype_id = furniture_inventory.ftype_id
    LEFT JOIN rooms
        ON rooms.room_id = furniture_inventory.room_id
    LEFT JOIN collections
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

  const INVENTORY_BY_CATEGORY = `
  SELECT furn_name, wood_name, ftype_name, collection_name, room_name, finv_id, finv_sku, finv_quantity FROM furniture_inventory
      LEFT JOIN furniture
          ON furniture.furn_id = furniture_inventory.furn_id
      LEFT JOIN wood
          ON wood.wood_id = furniture_inventory.wood_id
      LEFT JOIN furniture_types
          ON furniture_types.ftype_id = furniture_inventory.ftype_id
      LEFT JOIN rooms
          ON rooms.room_id = furniture_inventory.room_id
      LEFT JOIN collections
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

async function getInventoryById(id) {
  const INVENTORY_BY_ID = `
  SELECT furniture.furn_id, furn_name, wood_name, ftype_name, collection_name, room_name, finv_id, finv_sku, finv_quantity FROM furniture_inventory
      LEFT JOIN furniture
          ON furniture.furn_id = furniture_inventory.furn_id
      LEFT JOIN wood
          ON wood.wood_id = furniture_inventory.wood_id
      LEFT JOIN furniture_types
          ON furniture_types.ftype_id = furniture_inventory.ftype_id
      LEFT JOIN rooms
          ON rooms.room_id = furniture_inventory.room_id
      LEFT JOIN collections
          ON collections.collection_id = furniture_inventory.collection_id
      WHERE finv_id = $1
  `;
  const result = await pool.query(INVENTORY_BY_ID, [id]);
  return result.rows[0];
}

// TODO: change this to update all fields, not just quantity
async function updateProductQuantityById(finv_id, quantity) {
  const result = await pool.query(
    `UPDATE furniture_inventory
    SET finv_quantity = $1
    WHERE finv_id = $2
    RETURNING *`,
    [Number(quantity), Number(finv_id)]
  );
  return result.rows[0];
}

async function deleteProductById(furn_id) {
  await pool.query(`DELETE FROM furniture WHERE furn_id = $1`, [furn_id]);
}

async function deleteCollectionById(collection_id) {
  await pool.query(`DELETE FROM collections WHERE collection_id = $1`, [
    collection_id,
  ]);
}

async function deleteWoodById(wood_id) {
  await pool.query(`DELETE FROM wood WHERE wood_id = $1`, [wood_id]);
}

async function deleteFtypeById(ftype_id) {
  await pool.query(`DELETE FROM furniture_types WHERE ftype_id = $1`, [
    ftype_id,
  ]);
}

async function deleteRoomById(room_id) {
  await pool.query(`DELETE FROM rooms WHERE room_id = $1`, [room_id]);
}

async function getAllWood() {
  const { rows } = await pool.query(`SELECT * FROM wood;`);
  return rows;
}

async function getAllTypes() {
  const { rows } = await pool.query(`SELECT * FROM furniture_types;`);
  return rows;
}

async function getAllCollections() {
  const { rows } = await pool.query(`SELECT * FROM collections;`);
  return rows;
}

async function getAllRooms() {
  const { rows } = await pool.query(`SELECT * FROM rooms;`);
  return rows;
}

async function updateCollection(name, id) {
  await pool.query(
    `UPDATE collections SET collection_name = $1
  WHERE collection_id = $2`,
    [name, id]
  );
  console.log('Updated collection id# ', id);
}

async function updateWood(name, id) {
  await pool.query(
    `UPDATE wood SET wood_name = $1
  WHERE wood_id = $2`,
    [name, id]
  );
  console.log('Updated wood id# ', id);
}

async function updateFtype(name, id) {
  await pool.query(
    `UPDATE furniture_types SET ftype_name = $1
  WHERE ftype_id = $2`,
    [name, id]
  );
  console.log('Updated ftype id# ', id);
}

async function updateRoom(name, id) {
  await pool.query(
    `UPDATE rooms SET room_name = $1
  WHERE room_id = $2`,
    [name, id]
  );
  console.log('Updated room id# ', id);
}
module.exports = {
  getAllInventory,
  getInventoryByCategory,
  getInventoryById,
  updateProductQuantityById,
  deleteProductById,
  deleteCollectionById,
  deleteWoodById,
  deleteFtypeById,
  deleteRoomById,
  getAllWood,
  getAllTypes,
  getAllCollections,
  getAllRooms,
  updateCollection,
  updateWood,
  updateFtype,
  updateRoom,
};
