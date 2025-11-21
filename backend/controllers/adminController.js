// controllers/adminController.js
import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "fallbacksecret", {
    expiresIn: "7d",
  });
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password required",
    });
  }

  try {
    // 1. Pehle check karo koi admin hai ya nahi
    let admin = await Admin.findOne({ email });

    // Agar admin nahi hai → pehli baar login → usko admin bana do
    if (!admin) {
      admin = await Admin.create({
        name: "Admin",
        email,
        password, // bcrypt automatically hash karega (pre-save hook)
      });

      const token = generateToken(admin._id);
      return res.status(201).json({
        success: true,
        message: "Admin created & logged in successfully!",
        token,
        firstTime: true,
      });
    }

    // Agar admin hai → password match karo
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = generateToken(admin._id);
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      firstTime: false,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};