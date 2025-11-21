// models/Doctor.js
import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: String, required: true },
  rating: { type: Number, default: 4.5 },
  patients: { type: String, default: "500+" },
  about: String,
  img: { type: String, required: true }, // Cloudinary URL
});

export default mongoose.model("Doctor", doctorSchema);