const express = require("express");
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  getUserPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");
const authenticate = require("../middleware/auth.middleware");

router.get("/", getAllPosts);
router.get("/me", authenticate, getUserPosts);
router.get("/:id", getPostById);
router.post("/", authenticate, createPost);
router.put("/:id", authenticate, updatePost);
router.delete("/:id", authenticate, deletePost);

module.exports = router;
