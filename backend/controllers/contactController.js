// controllers/contactController.js
import Contact from "../models/Contact.js";

export const submitContact = async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    // Basic validation (extra safety)
    if (!fullName || !email || !phone || !subject || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newContact = new Contact({
      fullName,
      email,
      phone,
      subject,
      message,
    });

    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Message received! We'll contact you soon",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};


// Naya function – saare messages fetch karega
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
};


export const getContactStats = async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();

    res.status(200).json({
      success: true,
      total: totalContacts,
      message: "Total contact messages count",
    });
  } catch (error) {
    console.error("Error fetching contact stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get stats",
    });
  }
};