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
    c.collection_id,
    c.collection_name,
    ARRAY_TO_STRING(ARRAY_AGG(DISTINCT ft.ftype_name), ', ') AS types,
    ARRAY_TO_STRING(ARRAY_AGG(DISTINCT r.room_name), ', ') AS rooms
  FROM furniture_inventory fi
  JOIN furniture f
      ON fi.furn_id = f.furn_id
  JOIN wood w
      ON fi.wood_id = w.wood_id
  LEFT JOIN collections c
          ON fi.collection_id = c.collection_id
  LEFT JOIN inventory_types it
      ON f.furn_id = it.furn_id
  LEFT JOIN furniture_types ft
      ON it.ftype_id = ft.ftype_id
  LEFT JOIN inventory_rooms ir
      ON f.furn_id = ir.furn_id
  LEFT JOIN rooms r
      ON ir.room_id = r.room_id
  GROUP BY fi.finv_id, f.furn_name, f.furn_description,
          w.wood_name, w.wood_id, c.collection_name,
          c.collection_id, fi.finv_quantity
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
  SELECT
    fi.finv_id,
    fi.finv_sku,
    fi.finv_quantity,
    f.furn_name,
    f.furn_description,
    w.wood_id,
    w.wood_name,
    c.collection_id,
    c.collection_name,
    ARRAY_TO_STRING(ARRAY_AGG(DISTINCT ft.ftype_name), ', ') AS types,
    ARRAY_TO_STRING(ARRAY_AGG(DISTINCT r.room_name), ', ') AS rooms
  FROM furniture_inventory fi
  JOIN furniture f
      ON fi.furn_id = f.furn_id
  JOIN wood w
      ON fi.wood_id = w.wood_id
  LEFT JOIN collections c
      ON fi.collection_id = c.collection_id
  LEFT JOIN inventory_types it
      ON f.furn_id = it.furn_id
  LEFT JOIN furniture_types ft
      ON it.ftype_id = ft.ftype_id
  LEFT JOIN inventory_rooms ir
      ON f.furn_id = ir.furn_id
  LEFT JOIN rooms r
      ON ir.room_id = r.room_id
      WHERE
          ($1::text IS NULL OR collection_name = $1::text)
          AND ($2::text IS NULL OR wood_name = $2::text)
          AND ($3::text IS NULL OR ftype_name = $3::text)
          AND ($4::text IS NULL OR room_name = $4::text)
      GROUP BY fi.finv_id, f.furn_name, f.furn_description,
        w.wood_name, w.wood_id, c.collection_name,
        c.collection_id, fi.finv_quantity
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
  SELECT
    fi.finv_id,
    fi.finv_sku,
    fi.finv_quantity,
    f.furn_id,
    f.furn_name,
    f.furn_description,
    w.wood_id,
    w.wood_name,
    c.collection_id,
    c.collection_name,
    ARRAY_TO_STRING(ARRAY_AGG(DISTINCT ft.ftype_name), ', ') AS types,
    ARRAY_TO_STRING(ARRAY_AGG(DISTINCT r.room_name), ', ') AS rooms
  FROM furniture_inventory fi
  JOIN furniture f
      ON fi.furn_id = f.furn_id
  JOIN wood w
      ON fi.wood_id = w.wood_id
  LEFT JOIN collections c
      ON fi.collection_id = c.collection_id
  LEFT JOIN inventory_types it
      ON f.furn_id = it.furn_id
  LEFT JOIN furniture_types ft
      ON it.ftype_id = ft.ftype_id
  LEFT JOIN inventory_rooms ir
      ON f.furn_id = ir.furn_id
  LEFT JOIN rooms r
      ON ir.room_id = r.room_id
  WHERE fi.finv_id = $1
  GROUP BY fi.finv_id, f.furn_id, f.furn_name, f.furn_description,
      w.wood_name, w.wood_id, c.collection_name,
      c.collection_id, fi.finv_quantity
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

async function createNewFurniture(name, description, collection) {
  await pool.query(
    `
    INSERT INTO furniture (furn_name, furn_description, collection_id)
    VALUES ($1, $2, $3)
    `,
    [name, description, collection]
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

async function createNewProduct(furn_id, quantity, wood, ftype, room) {
  await pool.query(
    `
    INSERT INTO furniture_inventory (furn_id, finv_quantity, wood_id, ftype_id, room_id )
    VALUES ($1, $2, $3, $4, $5)
    `,
    [furn_id, quantity, wood, ftype, room]
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

async function deleteProductByFinvId(finv_id) {
  await pool.query(`DELETE FROM furniture_inventory WHERE finv_id = $1`, [
    finv_id,
  ]);
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
  const { rows } = await pool.query(`
    SELECT * FROM wood
    ORDER BY wood_name;
    `);
  return rows;
}

async function getAllTypes() {
  const { rows } = await pool.query(`
    SELECT * FROM furniture_types
    ORDER BY ftype_name;
    `);
  return rows;
}

async function getAllCollections() {
  const { rows } = await pool.query(`
    SELECT * FROM collections
    ORDER BY collection_name;
    `);
  return rows;
}

async function getAllRooms() {
  const { rows } = await pool.query(`
    SELECT * FROM rooms
    ORDER BY room_name;
    `);
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
  id, // finv_id
  furn_id,
  name, // furniture name
  description, // furniture description
  quantity, // updated stock quantity
  wood, // wood_id
  ftype, // ftype_id
  roomIds = [], // array of room_ids selected in form
  collection // collection_id
) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Update furniture-level info
    await client.query(
      `
      UPDATE furniture
        SET furn_name = $1,
            furn_description = $2,
            collection_id = $3
        WHERE furn_id = $4
      `,
      [name, description, collection, furn_id]
    );

    // Update inventory stock & wood
    await client.query(
      `
      UPDATE furniture_inventory
        SET finv_quantity = $1,
            wood_id = $2,
            collection_id = $3
        WHERE finv_id = $4
      `,
      [quantity, wood, collection, id]
    );

    // --- Update ROOM TAGS ---
    await client.query(`DELETE FROM inventory_rooms WHERE furn_id = $1`, [
      furn_id,
    ]);
    for (const roomId of roomIds) {
      await client.query(
        `INSERT INTO inventory_rooms (furn_id, room_id)
         VALUES ($1, $2)`,
        [furn_id, roomId]
      );
    }

    // --- Update TYPE TAGS ---
    await client.query(`DELETE FROM inventory_types WHERE furn_id = $1`, [
      furn_id,
    ]);
    await client.query(
      `INSERT INTO inventory_types (furn_id, ftype_id)
         VALUES ($1, $2)`,
      [furn_id, ftype]
    );

    await client.query('COMMIT');

    // Fetch the updated inventory record
    const result = await client.query(
      `
      SELECT fi.*,
             f.furn_name,
             f.furn_description,
             w.wood_name,
             c.collection_name,
             ARRAY_TO_STRING(ARRAY_AGG(DISTINCT ft.ftype_name), ', ') AS types,
             ARRAY_TO_STRING(ARRAY_AGG(DISTINCT r.room_name), ', ') AS rooms
      FROM furniture_inventory fi
      JOIN furniture f ON fi.furn_id = f.furn_id
      LEFT JOIN wood w ON fi.wood_id = w.wood_id
      LEFT JOIN collections c ON fi.collection_id = c.collection_id
      LEFT JOIN inventory_types it ON f.furn_id = it.furn_id
      LEFT JOIN furniture_types ft ON it.ftype_id = ft.ftype_id
      LEFT JOIN inventory_rooms ir ON f.furn_id = ir.furn_id
      LEFT JOIN rooms r ON ir.room_id = r.room_id
      WHERE fi.finv_id = $1
      GROUP BY fi.finv_id, f.furn_name, f.furn_description,
          w.wood_name, w.wood_id, c.collection_name,
          c.collection_id, fi.finv_quantity
      `,
      [id]
    );

    return result.rows[0];
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

module.exports = {
  getAllInventory,
  getInventoryByCategory,
  getInventoryById,
  updateProductQuantityById,
  createNewCollection,
  createNewWood,
  createNewFtype,
  createNewRoom,
  createNewFurniture,
  createNewProduct,
  deleteProductById,
  deleteProductByFinvId,
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
