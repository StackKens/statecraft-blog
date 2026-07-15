const pool = require("../db/index");

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

async function getUserPosts(req, res) {
  try {
    const result = await pool.query(
      "SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.id],
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "server error" });
  }
}

async function createPost(req, res) {
  const { title, description, details, category } = req.body;
  const image = req.file ? req.file.path : null;

  if (!title || !description || !details || !category) {
    return res.status(400).json({ message: "Title, description, details, and category are required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO posts (title, image, description, details, category, user_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, image, description, details, category, req.user.id],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "server error" });
  }
}

async function updatePost(req, res) {
  const id = Number(req.params.id);
  const { title, description, details, category } = req.body;
  const image = req.file ? req.file.path : undefined;

  try {
    const existing = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (existing.rows[0].user_id !== req.user.id) {
      return res.status(403).json({ message: "You can only edit your own posts" });
    }

    const result = await pool.query(
      `UPDATE posts
       SET title = $1, image = $2, description = $3, details = $4, category = $5
       WHERE id = $6
       RETURNING *`,
      [
        title || existing.rows[0].title,
        image || existing.rows[0].image,
        description || existing.rows[0].description,
        details || existing.rows[0].details,
        category || existing.rows[0].category,
        id,
      ],
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "server error" });
  }
}

async function deletePost(req, res) {
  const id = Number(req.params.id);

  try {
    const existing = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (existing.rows[0].user_id !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own posts" });
    }

    await pool.query("DELETE FROM posts WHERE id = $1", [id]);
    res.json({ message: "Post deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "server error" });
  }
}

module.exports = {
  getAllPosts,
  getPostById,
  getUserPosts,
  createPost,
  updatePost,
  deletePost,
};
