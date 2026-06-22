import jwt from "jsonwebtoken";
import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, phone, avatarUrl } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "username, email, and password are required" });
    }
    const user = await registerUser({ username, email, password, phone, avatarUrl });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message || "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }
    const user = await loginUser({ email, password });
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message || "Server error" });
  }
};
