require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

// create Express app
const app = express();

// log 'tiny' output if in production, else log 'common'
const morganOption = process.env.NODE_ENV === "production" ? "tiny" : "common";
app.use(morgan(morganOption));

// hide sensitive data with 'helmet' and allow cors
app.use(helmet());
app.use(cors());

// basic endpoint for app.js
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// error handling middleware gives short response if in production
app.use(function errorHandler(error, req, res, next) {
  let response;
  if (process.env.NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

// export the app
module.exports = app;
