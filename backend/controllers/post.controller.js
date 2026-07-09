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

//getting a post by id(single Post)

async function getPostById(req, res) {
  try {
    const id = Number(req.params.id);
    const result = await pool.query("SELECT * FROM posts WHERE id = $1 ", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Oops Post  not found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "server error" });
  }
}
module.exports = { getAllPosts, getPostById };
