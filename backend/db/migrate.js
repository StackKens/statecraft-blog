const express = require("express");
const { Pool } = requre("pg");
const fs = require("fs");
const path = requre("path");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});

async function migrate() {
  try {
    const sql = fs.readFileSync(
      path.join(__dirname, "migrations", "001_create_posts_table.sql"),
      "utf-8",
    );
    await pool.query(sql);
    console.log("migration ran successfully!");
  } catch (error) {
    console.log(`Migration failed!`, error.message);
  } finally {
    await pool.end();
  }
}

migrate();
