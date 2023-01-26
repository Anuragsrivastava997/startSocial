import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

// Express Initialization
const app = express();

// Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importing routes
import authRouter from "./Routes/authRoutes.js";
import postRouter from "./routes/postRoutes.js";
import userRouter from "./routes/userRoutes.js";

// Middlewares
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// Routes
app.get("/test", (req, res) => {
  res.send("working");
});

app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);

export default app;
