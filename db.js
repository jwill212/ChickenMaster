// db.js
const { Pool } = require('pg');

// Create a new pool instance
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, // default port for PostgreSQL
});

// Export the pool to use in other files
module.exports = pool;