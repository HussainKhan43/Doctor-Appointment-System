import express from "express";
import {
  bookAppointment,
  getMyAppointments,
  getAllAppointments,
  getAppointmentStats,
} from "../controllers/appointmentController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST - Book appointment (user)
router.post("/", protect, bookAppointment);

// GET - User's own appointments
router.get("/my", protect, getMyAppointments);

// GET - ALL appointments (ADMIN ONLY)
router.get("/all", protect,  getAllAppointments);

// GET - Appointment Stats (ADMIN ONLY)
router.get("/stats", protect,  getAppointmentStats);

export default router;
