import dotenv from "dotenv";
import mongoose from "mongoose";

import app from "./app.js";
dotenv.config();

const PORT = process.env.PORT || 3000;

// connecting to the database
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

//starting the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
