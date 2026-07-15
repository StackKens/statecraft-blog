const pool = require("../db/index");

async function getComments(req, res) {
  try {
    const postId = Number(req.params.postId);
    const result = await pool.query(
      `SELECT c.id, c.body, c.created_at, c.user_id, u.name AS author
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.post_id = $1
       ORDER BY c.created_at DESC`,
      [postId],
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "server error" });
  }
}

async function createComment(req, res) {
  const postId = Number(req.params.postId);
  const { body } = req.body;

  if (!body || !body.trim()) {
    return res.status(400).json({ message: "Comment body is required" });
  }

  try {
    const postCheck = await pool.query("SELECT id FROM posts WHERE id = $1", [postId]);
    if (postCheck.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    const result = await pool.query(
      `INSERT INTO comments (body, user_id, post_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [body.trim(), req.user.id, postId],
    );

    const comment = result.rows[0];

    const userResult = await pool.query("SELECT name FROM users WHERE id = $1", [req.user.id]);

    res.status(201).json({
      ...comment,
      author: userResult.rows[0].name,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "server error" });
  }
}

async function deleteComment(req, res) {
  const commentId = Number(req.params.id);

  try {
    const existing = await pool.query("SELECT * FROM comments WHERE id = $1", [commentId]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (existing.rows[0].user_id !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own comments" });
    }

    await pool.query("DELETE FROM comments WHERE id = $1", [commentId]);
    res.json({ message: "Comment deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "server error" });
  }
}

module.exports = { getComments, createComment, deleteComment };
