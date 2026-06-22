import mongoose from "mongoose";
import dns from "dns";

// Force Node to use Google's public DNS for resolving MongoDB Atlas SRV records,
// since this machine's default DNS resolution doesn't work reliably with Node.
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    console.error("Server will continue running without a database connection.");
  }
};

export default connectDB;