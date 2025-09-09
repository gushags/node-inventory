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
  PRIMARY KEY(furn_id)
);
ALTER SEQUENCE furniture_furn_id_seq RESTART WITH 500;

CREATE TABLE furniture_inventory (
  finv_id SERIAL,
  finv_quantity INT DEFAULT 0,
  furn_id INT,
  wood_id INT,
  collection_id INT,
  ftype_id INT,
  room_id INT,
  finv_sku VARCHAR(255),
  PRIMARY KEY(finv_id),
  CONSTRAINT fk_furniture
      FOREIGN KEY(furn_id)
        REFERENCES furniture(furn_id),
  CONSTRAINT fk_wood
      FOREIGN KEY(wood_id)
        REFERENCES wood(wood_id),
  CONSTRAINT fk_collections
      FOREIGN KEY(collection_id)
        REFERENCES collections(collection_id),
  CONSTRAINT fk_ftypes
      FOREIGN KEY(ftype_id)
        REFERENCES furniture_types(ftype_id),
  CONSTRAINT fk_rooms
      FOREIGN KEY(room_id)
        REFERENCES rooms(room_id)
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
    ('Sayers Collection'),
    ('Wolfe Collection');

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

INSERT INTO furniture (furn_name, furn_description)
VALUES
    ('Bill Gorton Chair', 'Nec dubitamus multa iter quae et nos invenerat.'),
    ('Jake Barnes Table', 'Gallia est omnis divisa in partes tres, quarum.'),
    ('Robert Cohn Hutch', 'Unam incolunt Belgae, aliam Aquitani, tertiam.'),
    ('Pamplona Deckchair', 'Quisque ut dolor gravida, placerat libero vel, euismod.'),
    ('Pedro Romero Bench', 'Ullamco laboris nisi ut aliquid ex ea commodi consequat.'),
    ('San Sebastien Bed', 'Magna pars studiorum, prodita quaerimus.'),
    ('Brett Ashley Headboard', 'Paullum deliquit, ponderibus modulisque suis ratio utitur.'),
    ('Cafe Side Table', 'Paullum deliquit, ponderibus modulisque suis ratio utitur.'),
    ('San Sebastien Dresser', 'Lorem ipsum dolor sit amet, consectetur adipisici elit.'),
    ('San Sebastien End Table', 'Nec dubitamus multa iter quae et nos invenerat.')
    ;

-- Hemingway
INSERT INTO furniture_inventory (finv_quantity, furn_id, wood_id, collection_id, ftype_id, room_id, finv_sku)
  VALUES
      --chair (303)
      (30, 500, 100, 202, 303, 401, 'BGC-Birch'),
      (40, 500, 101, 202, 303, 401, 'BGC-Cherry'),
      (40, 500, 102, 202, 303, 401, 'BGC-Oak'),
      (40, 500, 103, 202, 303, 401, 'BGC-Walnut'),
      --table
      (5, 501, 100, 202, 308, 401, 'JBT-Birch'),
      (7, 501, 101, 202, 308, 401, 'JBT-Cherry'),
      (4, 501, 102, 202, 308, 401, 'JBT-Oak'),
      (3, 501, 103, 202, 308, 401, 'JBT-Walnut'),
      --hutch
      (2, 502, 100, 202, 307, 401, 'RCH-Birch'),
      (3, 502, 101, 202, 307, 401, 'RCH-Cherry'),
      (0, 502, 102, 202, 307, 401, 'RCH-Oak'),
      (1, 502, 103, 202, 307, 401, 'RCH-Walnut'),
      --deckchair
      (12, 503, 102, 202, 302, 403, 'PD-Oak'),
      (11, 503, 103, 202, 302, 403, 'PD-Walnut'),
      --bench
      (8, 504, 100, 202, 301, 402, 'PRB-Birch'),
      (5, 504, 101, 202, 301, 402, 'PRB-Cherry'),
      (3, 504, 102, 202, 301, 402, 'PRB-Oak'),
      (17, 504, 103, 202, 301, 402, 'PRB-Walnut'),
      --bed
      (2, 505, 100, 202, 300, 400, 'SSB-Birch'),
      (1, 505, 101, 202, 300, 400, 'SSB-Cherry'),
      (2, 505, 102, 202, 300, 400, 'SSB-Oak'),
      (2, 505, 103, 202, 300, 400, 'ssb-Walnut'),
      --headboard
      (2, 506, 100, 202, 306, 400, 'SSB-Birch'),
      (1, 506, 101, 202, 306, 400, 'SSB-Cherry'),
      (2, 506, 102, 202, 306, 400, 'SSB-Oak'),
      (2, 506, 103, 202, 306, 400, 'SSB-Walnut'),
      --side table
      (8, 507, 100, 202, 309, 402, 'CST-Birch'),
      (6, 507, 101, 202, 309, 402, 'CST-Cherry'),
      (7, 507, 102, 202, 309, 402, 'CST-Oak'),
      (0, 507, 103, 202, 309, 402, 'CST-Walnut'),
      --dresser
      (2, 508, 100, 202, 304, 400, 'SSD-Birch'),
      (0, 508, 101, 202, 304, 400, 'SSD-Cherry'),
      (1, 508, 102, 202, 304, 400, 'SSD-Oak'),
      (1, 508, 103, 202, 304, 400, 'SSD-Walnut'),
      --end table
      (4, 509, 100, 202, 305, 400, 'SSD-Birch'),
      (7, 509, 101, 202, 305, 400, 'SSD-Cherry'),
      (2, 509, 102, 202, 305, 400, 'SSD-Oak'),
      (2, 509, 103, 202, 305, 400, 'SSD-Walnut'),