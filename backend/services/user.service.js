import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const updateProfile = async (userId, { username, phone, avatarUrl }) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (username !== undefined) user.username = username;
  if (phone !== undefined) user.phone = phone;
  if (avatarUrl !== undefined) user.avatarUrl = avatarUrl;

  await user.save();

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    phone: user.phone,
    avatarUrl: user.avatarUrl,
  };
};

export const changePassword = async (userId, { oldPassword, newPassword }) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
  if (!isMatch) {
    const error = new Error("Current password is incorrect");
    error.statusCode = 401;
    throw error;
  }

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  await user.save();

  return { message: "Password updated successfully" };
};
