require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const pool = require("./db/index");

const app = express();

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
});

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  }),
);

app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const postRoute = require("./routes/postRoute");
const commentRoutes = require("./routes/commentRoutes");
const likeRoutes = require("./routes/likeRoutes");
const authRoutes = require("./routes/auth.routes");

app.use("/posts", postRoute);
app.use("/posts/:postId/comments", commentRoutes);
app.use("/posts/:postId/likes", likeRoutes);
app.use("/api/auth", authRoutes);

const start = async function () {
  const PORT = process.env.PORT || 3001;
  try {
    await pool.query("SELECT 1");
    console.log("DATABASE CONNECTED SUCCESSFULLY!");
    console.log("CLIENT_URL:", process.env.CLIENT_URL);
    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`server running on port ${PORT}...`);
    });
    server.on("error", (err) => {
      console.error("Server error:", err);
      process.exit(1);
    });
  } catch (error) {
    console.error("Database connection failed!", error.message);
    process.exit(1);
  }
};

start();
