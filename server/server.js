const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() =>
    console.log("MongoDB connect successfull"),
  )
  .catch((error) => console.log(error));

const app = express();
app.use(express.json());
app.use("/api", userRoute);
app.use("/api", authRoute);
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running");
});
