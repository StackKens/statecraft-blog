const pool = require("../db/index");

async function toggleLike(req, res) {
  const postId = Number(req.params.postId);
  const { is_like } = req.body;

  if (typeof is_like !== "boolean") {
    return res.status(400).json({ message: "is_like must be a boolean" });
  }

  try {
    const postCheck = await pool.query("SELECT id FROM posts WHERE id = $1", [postId]);
    if (postCheck.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    const existing = await pool.query(
      "SELECT * FROM likes WHERE user_id = $1 AND post_id = $2",
      [req.user.id, postId],
    );

    if (existing.rows.length > 0) {
      if (existing.rows[0].is_like === is_like) {
        await pool.query(
          "DELETE FROM likes WHERE user_id = $1 AND post_id = $2",
          [req.user.id, postId],
        );
        return res.json({ liked: false, disliked: false });
      }

      await pool.query(
        "UPDATE likes SET is_like = $1 WHERE user_id = $2 AND post_id = $3",
        [is_like, req.user.id, postId],
      );
    } else {
      await pool.query(
        "INSERT INTO likes (user_id, post_id, is_like) VALUES ($1, $2, $3)",
        [req.user.id, postId, is_like],
      );
    }

    const counts = await getLikeCounts(postId);
    const status = await getLikeStatus(postId, req.user.id);
    res.json({ ...counts, ...status });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "server error" });
  }
}

async function getLikeStatus(postId, userId) {
  const result = await pool.query(
    "SELECT is_like FROM likes WHERE user_id = $1 AND post_id = $2",
    [userId, postId],
  );

  if (result.rows.length === 0) {
    return { liked: false, disliked: false };
  }

  return {
    liked: result.rows[0].is_like === true,
    disliked: result.rows[0].is_like === false,
  };
}

async function getLikeCounts(postId) {
  const result = await pool.query(
    "SELECT is_like, COUNT(*)::int AS count FROM likes WHERE post_id = $1 GROUP BY is_like",
    [postId],
  );

  let likeCount = 0;
  let dislikeCount = 0;

  for (const row of result.rows) {
    if (row.is_like) likeCount = row.count;
    else dislikeCount = row.count;
  }

  return { likeCount, dislikeCount };
}

async function getLikes(req, res) {
  const postId = Number(req.params.postId);

  try {
    const counts = await getLikeCounts(postId);
    const status = req.user
      ? await getLikeStatus(postId, req.user.id)
      : { liked: false, disliked: false };

    res.json({ ...counts, ...status });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "server error" });
  }
}

module.exports = { toggleLike, getLikes };
