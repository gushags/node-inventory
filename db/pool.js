// db/pool.js
require('dotenv').config();
const { Pool } = require('pg');

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

module.exports = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: PGPORT,
  ssl: {
    require: true,
  },
});
