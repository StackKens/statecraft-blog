const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getComments,
  createComment,
  deleteComment,
} = require("../controllers/comment.controller");
const authenticate = require("../middleware/auth.middleware");

router.get("/", getComments);
router.post("/", authenticate, createComment);
router.delete("/:id", authenticate, deleteComment);

module.exports = router;
