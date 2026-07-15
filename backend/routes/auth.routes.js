const express = require("express");
const router = express.Router();
const {
  login,
  register,
  getProfile,
} = require("../controllers/auth.controller");
const authenticate = require("../middleware/auth.middleware");

router.post("/login", login);
router.post("/register", register);
router.get("/profile", authenticate, getProfile);
module.exports = router;
