import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import {validateUserDetails} from "../utils/ValidateUser.js";
import bcrypt from "bcrypt";


export const register = async (req, res) => {
  try {
    console.log("Register controller called with data:", req.body);
    const { name, email, password } = req.body;

    const { isValid, errors } = validateUserDetails({
      name,
      email,
      password,
    });

    if (!isValid) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const emailNormalizer = email.toLowerCase().trim();

    let user = await User.findOne({
      email: emailNormalizer,
    });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    user = await User.create({
      name: name.trim(),
      email: emailNormalizer,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in register controller:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",

      token,

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in login controller:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


