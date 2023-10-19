const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./src/config/connectDB");
const initRouters = require("./src/routers");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to database
connectDB();
const arr = ["http://localhost:5000"];
// connect to react
const corsOptions = {
  origin: arr,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const port = process.env.APP_PORT || 3000;

initRouters(app); // run router

//listen to port
app.listen(port, async () => {
  try {
    console.log(`App listening on port ${port}, http://localhost:${port}`);
  } catch (error) {
    console.log("err", error);
  }
});
