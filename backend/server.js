import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB();

// Global middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/health", healthRoutes);

// Future routes will be mounted here, e.g.:
app.use("/api/auth", authRoutes);
// app.use("/api/properties", propertyRoutes);
// app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});