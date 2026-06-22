import { updateProfile, changePassword } from "../services/user.service.js";

export const updateMe = async (req, res) => {
  try {
    const { username, phone, avatarUrl } = req.body;
    const user = await updateProfile(req.user.id, { username, phone, avatarUrl });
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message || "Server error" });
  }
};

export const updateMyPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "oldPassword and newPassword are required" });
    }
    const result = await changePassword(req.user.id, { oldPassword, newPassword });
    res.status(200).json(result);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message || "Server error" });
  }
};
