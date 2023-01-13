import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import app from "./app.js";
dotenv.config();

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB_URL.replace("<password>", process.env.DB_PASSWORD))
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
