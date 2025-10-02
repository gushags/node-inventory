#! /usr/bin/env node
require('dotenv').config();

const { Client } = require('pg');

const { PGPOSTGRESQLURL } = process.env;

const SQL = `
DROP TABLE IF EXISTS furniture_inventory;
DROP TABLE IF EXISTS inventory_rooms;
DROP TABLE IF EXISTS inventory_types;
DROP TABLE IF EXISTS furniture;
DROP TABLE IF EXISTS wood;
DROP TABLE IF EXISTS collections;
DROP TABLE IF EXISTS furniture_types;
DROP TABLE IF EXISTS rooms;

CREATE TABLE wood(
  wood_id SERIAL,
  wood_name VARCHAR(255) NOT NULL,
  PRIMARY KEY(wood_id)
);
ALTER SEQUENCE wood_wood_id_seq RESTART WITH 100;

CREATE TABLE collections (
  collection_id SERIAL,
  collection_name VARCHAR(255) NOT NULL,
  PRIMARY KEY(collection_id)
);
ALTER SEQUENCE collections_collection_id_seq RESTART WITH 200;

CREATE TABLE furniture_types (
  ftype_id SERIAL,
  ftype_name VARCHAR(255) NOT NULL,
  PRIMARY KEY(ftype_id)
);
ALTER SEQUENCE furniture_types_ftype_id_seq RESTART WITH 300;

CREATE TABLE rooms (
  room_id SERIAL,
  room_name VARCHAR(255) NOT NULL,
  PRIMARY KEY(room_id)
);
ALTER SEQUENCE rooms_room_id_seq RESTART WITH 400;

CREATE TABLE furniture (
  furn_id INT GENERATED ALWAYS AS IDENTITY,
  furn_name VARCHAR(255) NOT NULL,
  furn_description TEXT,
  collection_id INT,
  PRIMARY KEY(furn_id),
  CONSTRAINT fk_collection
      FOREIGN KEY(collection_id)
        REFERENCES collections(collection_id)
        ON DELETE SET NULL
);
ALTER SEQUENCE furniture_furn_id_seq RESTART WITH 500;

CREATE TABLE furniture_inventory (
  finv_id SERIAL PRIMARY KEY,
  furn_id INT NOT NULL REFERENCES furniture(furn_id) ON DELETE CASCADE,
  wood_id INT REFERENCES wood(wood_id) ON DELETE SET NULL,
  collection_id INT REFERENCES collections(collection_id) ON DELETE SET NULL,
  finv_quantity INT DEFAULT 0,
  finv_sku TEXT GENERATED ALWAYS AS (
    (furn_id::TEXT || wood_id::TEXT || finv_id::TEXT)
    ) STORED,
  CONSTRAINT unique_inventory UNIQUE (furn_id, wood_id, collection_id)
);
ALTER SEQUENCE furniture_inventory_finv_id_seq RESTART WITH 1000;

CREATE TABLE inventory_rooms (
  furn_id INT REFERENCES furniture(furn_id) ON DELETE CASCADE,
  room_id INT REFERENCES rooms(room_id) ON DELETE CASCADE,
  PRIMARY KEY (furn_id, room_id)
);

CREATE TABLE inventory_types (
  furn_id INT REFERENCES furniture(furn_id) ON DELETE CASCADE,
  ftype_id INT REFERENCES furniture_types(ftype_id) ON DELETE CASCADE,
  PRIMARY KEY (furn_id, ftype_id)
);


INSERT INTO wood (wood_name)
VALUES
    ('Birch'),
    ('Cherry'),
    ('Oak'),
    ('Walnut');

INSERT INTO collections (collection_name)
VALUES
    ('Ezra Collection'),
    ('Fitzgerald Collection'),
    ('Hemingway Collection'),
    ('Woolf Collection');

INSERT INTO furniture_types (ftype_name)
VALUES
    ('Bed'),
    ('Bench'),
    ('Deckchair'),
    ('Chair'),
    ('Dresser'),
    ('End Table'),
    ('Headboard'),
    ('Hutch'),
    ('Kitchen Table'),
    ('Side Table');

INSERT INTO rooms (room_name)
VALUES
    ('Bedroom'),
    ('Dining Room'),
    ('Family Room'),
    ('Outdoor');

INSERT INTO furniture (furn_name, furn_description, collection_id)
VALUES
    -- Hemingway Collection
    ('Bill Gorton Chair', 'Nec dubitamus multa iter quae et nos invenerat.', 202),
    ('Jake Barnes Table', 'Gallia est omnis divisa in partes tres, quarum.', 202),
    ('Robert Cohn Hutch', 'Unam incolunt Belgae, aliam Aquitani, tertiam.', 202),
    ('Pamplona Deckchair', 'Quisque ut dolor gravida, placerat libero vel, euismod.', 202),
    ('Pedro Romero Bench', 'Ullamco laboris nisi ut aliquid ex ea commodi consequat.', 202),
    ('San Sebastien Bed', 'Magna pars studiorum, prodita quaerimus.', 202),
    ('Brett Ashley Headboard', 'Paullum deliquit, ponderibus modulisque suis ratio utitur.', 202),
    ('Cafe Side Table', 'Paullum deliquit, ponderibus modulisque suis ratio utitur.', 202),
    ('San Sebastien Dresser', 'Lorem ipsum dolor sit amet, consectetur adipisici elit.', 202),
    ('San Sebastien End Table', 'Nec dubitamus multa iter quae et nos invenerat.', 202),
    -- Fitgerald Collection
    ('Jordan Baker Deckchair', 'Phasellus laoreet lorem vel dolor tempus vehicula.', 201),
    ('Jay Gatsby Chair', 'Paullum deliquit, ponderibus modulisque suis ratio utitur.', 201),
    ('Daisy Buchanan Table', 'Gallia est omnis divisa in partes tres, quarum.', 201),
    ('Tom Buchanan Dresser', 'Quo usque tandem abutere, Catilina, patientia nostra?', 201),
    ('Myrtle End Table', 'Gallia est omnis divisa in partes tres, quarum.', 201),
    ('Nick Carraway Bench', 'Cras mattis iudicium purus sit amet fermentum.', 201),
    -- Ezra Collection
    ('Cantos Chair', 'Quisque ut dolor gravida, placerat libero vel, euismod.', 200),
    ('Le Mot Juste Table', 'Inmensae subtilitatis, obscuris et malesuada fames.', 200)
    ;

INSERT INTO furniture_inventory (finv_quantity, furn_id, wood_id, collection_id)
  VALUES
      --Hemingway
      --chair
      (30, 500, 100, 202),
      (40, 500, 101, 202),
      (40, 500, 102, 202),
      (40, 500, 103, 202),
      --table
      (5, 501, 100, 202),
      (7, 501, 101, 202),
      (4, 501, 102, 202),
      (3, 501, 103, 202),
      --hutch
      (2, 502, 100, 202),
      (3, 502, 101, 202),
      (0, 502, 102, 202),
      (1, 502, 103, 202),
      --deckchair
      (12, 503, 102, 202),
      (11, 503, 103, 202),
      --bench
      (8, 504, 100, 202),
      (5, 504, 101, 202),
      (3, 504, 102, 202),
      (17, 504, 103, 202),
      --bed
      (2, 505, 100, 202),
      (1, 505, 101, 202),
      (2, 505, 102, 202),
      (2, 505, 103, 202),
      --headboard
      (2, 506, 100, 202),
      (1, 506, 101, 202),
      (2, 506, 102, 202),
      (2, 506, 103, 202),
      --side table
      (8, 507, 100, 202),
      (6, 507, 101, 202),
      (7, 507, 102, 202),
      (0, 507, 103, 202),
      --dresser
      (2, 508, 100, 202),
      (0, 508, 101, 202),
      (1, 508, 102, 202),
      (1, 508, 103, 202),
      --end table
      (4, 509, 100, 202),
      (7, 509, 101, 202),
      (2, 509, 102, 202),
      (2, 509, 103, 202),
      --Fitzgerald
      --deckchair
      (5, 510, 102, 201),
      (2, 510, 103, 201),
      --chair
      (20, 511, 100, 201),
      (41, 511, 101, 201),
      (34, 511, 102, 201),
      (20, 511, 103, 201),
      --table
      (2, 512, 100, 201),
      (8, 512, 101, 201),
      (3, 512, 102, 201),
      (1, 512, 103, 201),
      --dresser
      (2, 513, 100, 201),
      (3, 513, 101, 201),
      (4, 513, 102, 201),
      (1, 513, 103, 201),
      --end table
      (7, 514, 100, 201),
      (9, 514, 101, 201),
      (6, 514, 102, 201),
      (8, 514, 103, 201),
      --bench
      (12, 515, 100, 201),
      (10, 515, 101, 201),
      (22, 515, 102, 201),
      (17, 515, 103, 201),
      --Ezra Collection
      --chair
      (32, 516, 101, 200),
      (40, 516, 102, 200),
      (22, 516, 103, 200),
      --table
      (2, 517, 101, 200),
      (9, 517, 102, 200),
      (3, 517, 103, 200);

INSERT INTO inventory_rooms (furn_id, room_id)
  VALUES
      (500, 401),
      (500, 402),
      (501, 401),
      (502, 401),
      (503, 403),
      (504, 401),
      (504, 402),
      (505, 400),
      (506, 400),
      (507, 400),
      (507, 402),
      (508, 400),
      (509, 400),
      (510, 403),
      (511, 401),
      (511, 402),
      (512, 401),
      (513, 400),
      (514, 400),
      (515, 401),
      (515, 402),
      (516, 401),
      (516, 402),
      (517, 401);

INSERT INTO inventory_types (furn_id, ftype_id)
  VALUES
      (500, 303),
      (501, 308),
      (502, 307),
      (503, 302),
      (504, 301),
      (505, 300),
      (506, 306),
      (507, 309),
      (508, 304),
      (509, 305),
      (510, 302),
      (511, 303),
      (512, 308),
      (513, 304),
      (514, 305),
      (515, 301),
      (516, 303),
      (517, 308);
    `;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: PGPOSTGRESQLURL, // Local is: 'postgresql://jeff@localhost:5432/woodworking'
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();
