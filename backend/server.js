const express = require("express");
const morgan = require("morgan");
const pool = require("./db/index");
require("dotenv").config();
const app = express();
const cors = require("cors");

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const postRoute = require("./routes/postRoute");
const commentRoutes = require("./routes/commentRoutes");
const likeRoutes = require("./routes/likeRoutes");

const authRoutes = require("./routes/auth.routes");

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
// logging and body parsing middleware
app.use(morgan("dev"));
app.use(express.json());

//getting all posts route
app.use("/posts", postRoute);

//comments on posts
app.use("/posts/:postId/comments", commentRoutes);

//likes on posts
app.use("/posts/:postId/likes", likeRoutes);

//login and register endpoints
app.use("/api/auth", authRoutes);

//starting the server
const start = async function () {
  const PORT = process.env.PORT || 3001;
  try {
    await pool.query("SELECT 1");
    console.log(`DATABASE CONNECTED SUCCESSFULLY!`);
    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`server running on port ${PORT}...`);
    });
    server.on("error", (err) => {
      console.error("Server error:", err);
      process.exit(1);
    });
  } catch (error) {
    console.log(`Database connection failed!`, error.message);
    process.exit(1);
  }
};

start();
