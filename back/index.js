require("dotenv").config();
const mongoose = require("mongoose");
const config = require("./database/configDB");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const userRoutes = require("./routes/users");
const allowedOrigin = "*";

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/api/users", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, "0.0.0.0", () => {
      console.log(`Connected to db & listening on port : ${port}`);
    });
  })
  .catch((err) => console.log(err));
