#! /usr/bin/env node
require('dotenv').config();

const { Client } = require('pg');

const { PGPOSTGRESQLURL } = process.env;

const SQL = `
DROP TABLE IF EXISTS furniture_inventory;
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
  finv_id SERIAL,
  finv_quantity INT DEFAULT 0,
  furn_id INT,
  wood_id INT,
  ftype_id INT,
  room_id INT,
  finv_sku TEXT GENERATED ALWAYS AS (
    (furn_id::TEXT || wood_id::TEXT || finv_id::TEXT)
  ) STORED,
  PRIMARY KEY(finv_id),
  CONSTRAINT fk_furniture
      FOREIGN KEY(furn_id)
        REFERENCES furniture(furn_id)
            ON DELETE CASCADE,
  CONSTRAINT fk_wood
      FOREIGN KEY(wood_id)
        REFERENCES wood(wood_id)
            ON DELETE SET NULL,
  CONSTRAINT fk_ftypes
      FOREIGN KEY(ftype_id)
        REFERENCES furniture_types(ftype_id)
            ON DELETE SET NULL,
  CONSTRAINT fk_rooms
      FOREIGN KEY(room_id)
        REFERENCES rooms(room_id)
            ON DELETE SET NULL
  CONSTRAINT unique_variant UNIQUE (furn_id, wood_id)
);
ALTER SEQUENCE furniture_inventory_finv_id_seq RESTART WITH 1000;

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

INSERT INTO furniture_inventory (finv_quantity, furn_id, wood_id, ftype_id, room_id)
  VALUES
      --Hemingway
      --chair
      (30, 500, 100, 303, 401),
      (40, 500, 101, 303, 401),
      (40, 500, 102, 303, 401),
      (40, 500, 103, 303, 401),
      --table
      (5, 501, 100, 308, 401),
      (7, 501, 101, 308, 401),
      (4, 501, 102, 308, 401),
      (3, 501, 103, 308, 401),
      --hutch
      (2, 502, 100, 307, 401),
      (3, 502, 101, 307, 401),
      (0, 502, 102, 307, 401),
      (1, 502, 103, 307, 401),
      --deckchair
      (12, 503, 102, 302, 403),
      (11, 503, 103, 302, 403),
      --bench
      (8, 504, 100, 301, 402),
      (5, 504, 101, 301, 402),
      (3, 504, 102, 301, 402),
      (17, 504, 103, 301, 402),
      --bed
      (2, 505, 100, 300, 400),
      (1, 505, 101, 300, 400),
      (2, 505, 102, 300, 400),
      (2, 505, 103, 300, 400),
      --headboard
      (2, 506, 100, 306, 400),
      (1, 506, 101, 306, 400),
      (2, 506, 102, 306, 400),
      (2, 506, 103, 306, 400),
      --side table
      (8, 507, 100, 309, 402),
      (6, 507, 101, 309, 402),
      (7, 507, 102, 309, 402),
      (0, 507, 103, 309, 402),
      --dresser
      (2, 508, 100, 304, 400),
      (0, 508, 101, 304, 400),
      (1, 508, 102, 304, 400),
      (1, 508, 103, 304, 400),
      --end table
      (4, 509, 100, 305, 400),
      (7, 509, 101, 305, 400),
      (2, 509, 102, 305, 400),
      (2, 509, 103, 305, 400),
      --Fitzgerald
      --deckchair
      (5, 510, 102, 302, 403),
      (2, 510, 103, 302, 403),
      --chair
      (20, 511, 100, 303, 401),
      (41, 511, 101, 303, 401),
      (34, 511, 102, 303, 401),
      (20, 511, 103, 303, 401),
      --table
      (2, 512, 100, 308, 401),
      (8, 512, 101, 308, 401),
      (3, 512, 102, 308, 401),
      (1, 512, 103, 308, 401),
      --dresser
      (2, 513, 100, 304, 400),
      (3, 513, 101, 304, 400),
      (4, 513, 102, 304, 400),
      (1, 513, 103, 304, 400),
      --end table
      (7, 514, 100, 305, 400),
      (9, 514, 101, 305, 400),
      (6, 514, 102, 305, 400),
      (8, 514, 103, 305, 400),
      --bench
      (12, 515, 100, 301, 402),
      (10, 515, 101, 301, 402),
      (22, 515, 102, 301, 402),
      (17, 515, 103, 301, 402),
      --Ezra Collection
      --chair
      (32, 516, 101, 303, 401),
      (40, 516, 102, 303, 401),
      (22, 516, 103, 303, 401),
      --table
      (2, 517, 101, 308, 401),
      (9, 517, 102, 308, 401),
      (3, 517, 103, 308, 401);
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
