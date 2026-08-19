const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const pool = require('./database');
const { config } = require('./environment');

async function initializeDatabase() {
  try {
    // 1. Ensure database exists
    const rootConn = await mysql.createConnection({
      host: config.dbHost,
      port: config.dbPort,
      user: config.dbUser,
      password: config.dbPassword,
    });
    await rootConn.query(`CREATE DATABASE IF NOT EXISTS \`${config.dbName}\``);
    await rootConn.end();

    // 2. Run schema.sql against the pool
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const statement of statements) {
      await pool.execute(statement);
    }
    
    console.log('[DB] Schema initialized successfully.');
  } catch (err) {
    console.error('[DB] Schema initialization failed:', err.message);
    throw err;
  }
}

module.exports = { initializeDatabase };
