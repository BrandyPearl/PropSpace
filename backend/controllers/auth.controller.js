import { registerUser } from "../services/auth.service.js";

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