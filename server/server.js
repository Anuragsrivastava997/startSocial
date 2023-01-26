import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import os from "os";
import cluster from "cluster";

import app from "./app.js";
dotenv.config();

const PORT = process.env.PORT || 3000;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URL.replace("<password>", process.env.DB_PASSWORD), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
