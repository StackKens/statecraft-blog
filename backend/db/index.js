const { Pool } = require("pg");
require("dotenv").config();
const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthoriaed: false },
});

module.exports = pool;
