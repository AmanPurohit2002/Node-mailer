const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connnectToDb = require("./config/db");
const routes = require("./routes/route");

// require('./cron-task/cron');

const app = express();

connnectToDb();

app.use(cors());

app.use(express.json());

app.use("/user", routes);

app.listen(process.env.PORT, () =>
  console.log(`Server is running @PORT ${process.env.PORT}`)
);
