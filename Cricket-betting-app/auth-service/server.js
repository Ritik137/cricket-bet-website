require("dotenv").config();
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// 🔹 Middleware
app.use(express.json());
app.use(cors());

// 🔹 DB Connect
connectDB();

// 🔹 Routes
app.use("/api/auth", require("./routes/authRoutes"));

// 🔹 Health Check
app.get("/", (req, res) => {
  res.send("Auth Service Running ✅");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Auth Service running on port ${PORT}`);
});