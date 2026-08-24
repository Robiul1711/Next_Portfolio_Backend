import mongoose from "mongoose";
import dns from "node:dns";

// Fix for Node.js querySrv ECONNREFUSED with MongoDB Atlas on Windows/local ISPs
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {
  // fallback if environment does not allow setting custom DNS
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("\x1b[32mMongoDB Connected Successfully\x1b[0m"); // Green text
  } catch (error) {
    console.error("\x1b[31mMongoDB Connection Failed\x1b[0m", error); // Red text
    process.exit(1);
  }
};

export default connectDB;

