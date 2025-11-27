import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import authRoutes from "./src/routes/authRoutes.js";
import lcRoutes from "./src/routes/lcRoutes.js";

const app = express();   // ✅ MUST COME FIRST

// Log auth header
app.use((req, res, next) => {
  console.log("AUTH HEADER:", req.headers.authorization);
  next();
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/leetcode", lcRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err);
  res.status(500).json({
    message: "Internal server error",
    error: err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
