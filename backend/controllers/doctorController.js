// controllers/doctorController.js
import asyncHandler from "express-async-handler";
import Doctor from "../models/Doctor.js";
import cloudinary from "../utils/cloudinary.js";

// GET all doctors
export const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find().sort({ rating: -1 });
  res.json({ success: true, count: doctors.length, data: doctors });
});

// CREATE doctor
// controllers/doctorController.js → createDoctor
export const createDoctor = asyncHandler(async (req, res) => {
  const { name, specialty, experience, rating, patients, about } = req.body;

  // Yeh check bohot zaroori hai ab!
  if (!req.file || !req.file.buffer) {
    res.status(400);
    throw new Error("Doctor image is required and must be valid");
  }

  // Upload to Cloudinary
  const b64 = Buffer.from(req.file.buffer).toString("base64");
  const dataURI = `data:${req.file.mimetype};base64,${b64}`;

  const cloudinaryRes = await cloudinary.uploader.upload(dataURI, {
    folder: "doctorcare/doctors",
    transformation: { width: 500, height: 600, crop: "fill" },
  });

  const doctor = await Doctor.create({
    name,
    specialty,
    experience,
    rating: rating || 4.5,
    patients: patients || "500+",
    about,
    img: cloudinaryRes.secure_url,
  });

  res.status(201).json({ success: true, data: doctor });
});

// UPDATE doctor
export const updateDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) {
    res.status(404);
    throw new Error("Doctor not found");
  }

  const updates = { ...req.body };

  if (req.file) {
    // Delete old image
    const publicId = doctor.img.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy("doctorcare/doctors/" + publicId);

    // Upload new
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "doctorcare/doctors",
    });
    updates.img = result.secure_url;
  }

  const updated = await Doctor.findByIdAndUpdate(req.params.id, updates, { new: true });
  res.json({ success: true, data: updated });
});

// DELETE doctor
export const deleteDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) {
    res.status(404);
    throw new Error("Doctor not found");
  }

  // Delete image from Cloudinary
  const publicId = doctor.img.split("/").pop().split(".")[0];
  await cloudinary.uploader.destroy("doctorcare/doctors/" + publicId);

  await doctor.deleteOne();
  res.json({ success: true, message: "Doctor deleted" });
});

// GET single doctor
export const getDoctorById = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) {
    res.status(404);
    throw new Error("Doctor not found");
  }
  res.json({ success: true, data: doctor });
});


export const getDoctorStats = async (req, res) => {
  try {
    const totalDoctors = await Doctor.countDocuments();
    
    // Optional: Agar tumhare Doctor model mein "status" field hai to
    const activeDoctors = await Doctor.countDocuments({ status: "active" });
    const inactiveDoctors = await Doctor.countDocuments({ status: "inactive" });

    // Agar specialization field hai to top specializations bhi nikal sakte ho
    const specializations = await Doctor.aggregate([
      { $group: { _id: "$specialization", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.status(200).json({
      success: true,
      data: {
        total: totalDoctors,
        active: activeDoctors || totalDoctors,     // agar status nahi hai to sab active maan lo
        inactive: inactiveDoctors || 0,
        topSpecializations: specializations.length > 0 ? specializations : []
      },
      message: "Doctor stats fetched successfully"
    });

  } catch (error) {
    console.error("Error in getDoctorStats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch doctor stats",
      error: error.message
    });
  }
};