// controllers/appointmentController.js
import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";

// @desc    Book new appointment
// @route   POST /api/appointments
// @access  Private
export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, doctorName, patientName, phone, email, date, time, message } = req.body;

    // Validate doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Optional: Check if slot is already booked (advanced feature baad mein laga sakta hai)

    const appointment = await Appointment.create({
      doctor: doctorId,
      doctorName: doctorName || doctor.name,
      patientName,
      phone,
      email,
      date,
      time,
      message: message || "",
      user: req.user.id, // from protect middleware
    });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully!",
      data: appointment,
    });
  } catch (error) {
    console.error("Book Appointment Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Get user's appointments
// @route   GET /api/appointments/my
// @access  Private
export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id })
      .populate("doctor", "name specialty img")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Get all appointments (Admin only)
// @route   GET /api/appointments
// @access  Private/Admin
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctor", "name specialty")
      .populate("user", "name email")
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const getAppointmentStats = async (req, res) => {
  try {
    // Total appointments count
    const totalAppointments = await Appointment.countDocuments();

    res.status(200).json({
      success: true,
      totalAppointments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching appointment stats",
      error: error.message,
    });
  }
};