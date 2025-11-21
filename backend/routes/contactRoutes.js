// routes/contactRoutes.js
import express from "express";                           // YE LINE ADD KAR DI
import { submitContact, getAllContacts, getContactStats } from "../controllers/contactController.js";

const router = express.Router();

router.post("/", submitContact);           // → POST /api/contact
router.get("/", getAllContacts);           // → GET /api/contact
router.get("/stats", getContactStats);     // → GET /api/contact/stats

export default router;