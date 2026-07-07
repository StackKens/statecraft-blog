const express = require("express");
const morgan = require("morgan");
const pool = require("./db/index");
require("dotenv").config();
const app = express();
const cors = require("cors");
// logging and body parsing middleware
app.use(morgan("dev"));
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

//starting the server
const start = async function () {
  const PORT = process.env.PORT || 5000;
  try {
    await pool.query("SELECT 1");
    console.log(`DATABASE CONNECTED SUCCESSFULLY!`);
    app.listen(PORT, () => {
      console.log(`server running...`);
    });
  } catch (error) {
    console.log(`Database connection failed!`, error.message);
    process.exit(1);
  }
};

start();
