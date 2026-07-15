const express = require("express");
const router = express.Router({ mergeParams: true });
const { toggleLike, getLikes } = require("../controllers/like.controller");
const authenticate = require("../middleware/auth.middleware");

router.get("/", getLikes);
router.post("/", authenticate, toggleLike);

module.exports = router;
