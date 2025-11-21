// routes/doctorRoutes.js

import express from "express";
import {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorById,
  getDoctorStats,        // YE NAYA IMPORT ADD KARNA
} from "../controllers/doctorController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/stats", getDoctorStats);

// Existing routes
router.route("/").get(getDoctors).post(upload.single("img"), createDoctor);
router
  .route("/:id")
  .get(getDoctorById)
  .put(upload.single("img"), updateDoctor)
  .delete(deleteDoctor);


export default router;