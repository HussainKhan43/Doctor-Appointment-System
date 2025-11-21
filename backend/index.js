import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";


dotenv.config();

const app = express();

// 1. CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));

// 2. Body parsers pehle hi lagao (best practice)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// 3. Routes (multer wale pehle)
app.use("/api/doctors", doctorRoutes);
app.use("/api/contact", contactRoutes);   // ← SAHI JAGAH
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);


// MongoDB...
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});