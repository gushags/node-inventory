// db/queries.js

const pool = require('./pool');

async function getAllInventory() {
  const SQL_ALL_INVENTORY = `
    SELECT
    fi.finv_id,
    fi.finv_sku,
    fi.finv_quantity,
    f.furn_name,
    w.wood_id,
    w.wood_name,
    ft.ftype_id,
    ft.ftype_name,
    c.collection_id,
    c.collection_name,
    r.room_id,
    r.room_name
FROM furniture_inventory fi
LEFT JOIN furniture f
    ON f.furn_id = fi.furn_id
LEFT JOIN wood w
    ON w.wood_id = fi.wood_id
LEFT JOIN furniture_types ft
    ON ft.ftype_id = fi.ftype_id
LEFT JOIN rooms r
    ON r.room_id = fi.room_id
LEFT JOIN collections c
    ON c.collection_id = fi.collection_id
ORDER BY c.collection_name, f.furn_name;

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

async function getProductById(id) {
  const PRODUCT_BY_ID = `
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
      WHERE furniture.furn_id = $1
  `;
  const result = await pool.query(PRODUCT_BY_ID, [id]);
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

async function createNewFurniture(name, description) {
  await pool.query(
    `
    INSERT INTO furniture (furn_name, furn_description)
    VALUES ($1, $2)
    `,
    [name, description]
  );
  const result = await pool.query(
    `
    SELECT furn_id FROM furniture
    WHERE furn_name = $1 AND furn_description = $2
    `,
    [name, description]
  );
  return result.rows[0];
}

async function createNewProduct(
  furn_id,
  quantity,
  wood,
  ftype,
  room,
  collection
) {
  await pool.query(
    `
    INSERT INTO furniture_inventory (furn_id, finv_quantity, wood_id, ftype_id, room_id, collection_id, finv_sku )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,
    [furn_id, quantity, wood, ftype, room, collection]
  );
}

async function createNewCollection(name) {
  await pool.query(
    `INSERT INTO collections (collection_name)
    VALUES ($1)`,
    [name]
  );
}

async function createNewWood(name) {
  await pool.query(
    `INSERT INTO wood (wood_name)
    VALUES ($1)`,
    [name]
  );
}

async function createNewFtype(name) {
  await pool.query(
    `INSERT INTO furniture_types (ftype_name)
    VALUES ($1)`,
    [name]
  );
}

async function createNewRoom(name) {
  await pool.query(
    `INSERT INTO rooms (room_name)
    VALUES ($1)`,
    [name]
  );
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
  console.log(rows);
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

async function updateProductById(
  id,
  furn_id,
  name,
  quantity,
  wood,
  ftype,
  room,
  collection
) {
  // Update furniture name if changed
  await pool.query(
    `
    UPDATE furniture
      SET furn_name = $1
      WHERE furn_id = $2
    `,
    [name, furn_id]
  );
  // Update inventory with all the data
  await pool.query(
    `UPDATE furniture_inventory
      SET finv_quantity = $1,
          wood_id = $2,
          collection_id = $3,
          ftype_id = $4,
          room_id = $5
      WHERE finv_id = $6`,
    [quantity, wood, collection, ftype, room, id]
  );

  const result = await pool.query(
    `
    SELECT * FROM FURNITURE_INVENTORY
    WHERE finv_id = $1
    `,
    [id]
  );
  console.log('Updated product id# ', furn_id);
  return result.rows[0];
}

module.exports = {
  getAllInventory,
  getInventoryByCategory,
  getInventoryById,
  getProductById,
  updateProductQuantityById,
  createNewCollection,
  createNewWood,
  createNewFtype,
  createNewRoom,
  createNewFurniture,
  createNewProduct,
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
  updateProductById,
};
