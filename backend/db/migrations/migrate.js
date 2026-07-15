const express = require("express");
const pool = require("../index");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const migrations = [
  "001_create_posts_table.sql",
  "002_create_users_table.sql",
  "003_add_user_id_to_posts.sql",
  "004_add_comments_likes.sql",
];

async function migrate() {
  try {
    for (const file of migrations) {
      const sql = fs.readFileSync(path.join(__dirname, file), "utf-8");
      await pool.query(sql);
      console.log(`${file} migration ran successfully!`);
    }
  } catch (error) {
    console.log(`Migration failed!`, error.message);
  } finally {
    await pool.end();
  }
}

migrate();
