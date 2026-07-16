require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
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

const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Server running on port ${PORT}`);
  console.log("CLIENT_URL:", process.env.CLIENT_URL);
  try {
    await pool.query("SELECT 1");
    console.log("DATABASE CONNECTED SUCCESSFULLY!");
  } catch (err) {
    console.error("DATABASE CONNECTION FAILED:", err.message);
  }
});
