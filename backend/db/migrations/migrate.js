const express = require("express");
const pool = require("../index");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

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
