const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load env variables
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Bet DB connected");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1); // stop app if DB not connected
  }
};

module.exports = connectDB;