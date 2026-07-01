const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const app = express();

// logging and body parsing middleware
app.use(morgan("dev"));
app.use(express.json());

//first route

//starting the server
const start = () => {
  const PORT = process.env.PORT || 5000;
  console.log("Server is running on port ", PORT);
  app.listen(PORT);
};

start();
