require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

// ✅ Middlewares pehle
app.use(cors());
app.use(express.json());

// ✅ DB connect
connectDB();

// ✅ Routes
app.use("/api/user", require("./routes/userRoutes"));

app.get("/", (req, res) => {
  res.send("User Service Running ✅");
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`🚀 User service running on ${PORT}`);
});