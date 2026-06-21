import bcrypt from "bcryptjs";
import User from "../models/User.js";

const SALT_ROUNDS = 10;

export const registerUser = async ({ username, email, password, phone, avatarUrl }) => {
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existingUser) {
    const field = existingUser.email === email ? "email" : "username";
    const error = new Error(`A user with that ${field} already exists`);
    error.statusCode = 400;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = await User.create({
    username,
    email,
    passwordHash,
    phone: phone || "",
    avatarUrl: avatarUrl || "",
  });

  return {
    id: newUser._id,
    username: newUser.username,
    email: newUser.email,
  };
};