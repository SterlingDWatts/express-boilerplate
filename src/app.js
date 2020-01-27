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

// export the app
module.exports = app;
