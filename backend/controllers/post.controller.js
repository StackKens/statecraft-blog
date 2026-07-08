const pool = require("../db/index");

// getting all posts
async function getAllPosts(req, res) {
  try {
    const result = await pool.query(
      "SELECT * FROM posts ORDER BY created_at DESC",
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "server Error" });
  }
}

module.exports = getAllPosts;
