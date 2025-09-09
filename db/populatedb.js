#! /usr/bin/env node
require('dotenv').config();

const { Client } = require('pg');

const { PGPOSTGRESQLURL } = process.env;

const SQL = `
DROP TABLE IF EXISTS wood;
DROP TABLE IF EXISTS collections;
DROP TABLE IF EXISTS furniture_types;
DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS furniture;

CREATE TABLE wood (
  wood_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  wood_name VARCHAR(255) NOT NULL,
);

CREATE TABLE collections (
  collection_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  collection_name VARCHAR(255) NOT NULL,
);

CREATE TABLE furniture_types (
  ftype_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  ftype_name VARCHAR(255) NOT NULL;
);

CREATE TABLE rooms (
  room_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  room_name VARCHAR(255) NOT NULL;
);

CREATE TABLE furniture (
  furn_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  furn_name VARCHAR(255) NOT NULL,
  description TEXT,
  quantity INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT fk_collections
      FOREIGN KEY(collection_id)
        REFERENCES collections(collection_id)
  CONSTRAINT fk_furniture_type
      FOREIGN KEY(ftype_id)
        REFERENCES furniture_types(ftype_id)
  CONSTRAINT fk_wood
      FOREIGN KEY(wood_id)
        REFERENCES wood(wood_id)
  CONSTRAINT fk_rooms
      FOREIGN KEY(room_id)
        REFERENCES rooms(room_id)
);`;

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
