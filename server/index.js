const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const authRoute = require("./routes/auth");
const cvRoute = require("./routes/cv");
const deployedCVRoute = require("./routes/deployedCV");
const logger = require("morgan");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(logger("dev"));
app.use("/api/auth", authRoute);
app.use("/api/cv", cvRoute);
app.use("/api/deployedCV", deployedCVRoute);

// Middleware to handle 500 status errors.
app.use((error, request, response, next) => {
  console.error(`[ERROR]: ${error}`);
  response.status(500).json(error);
});

app.listen(7777, () => {
  console.log("Backend is running");
});
