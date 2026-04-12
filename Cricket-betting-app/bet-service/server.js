require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.js");
const betRoutes = require("./routes/betRoute.js");
const cors = require("cors");

const app = express();
app.use(express.json());

connectDB();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
  }),
);
app.use("/api/bet", betRoutes);

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Bet service running on ${PORT}`);
});
