require("dotenv").config(); // 🔥 THIS IS MISSING
const express = require("express");
const connectDB = require("./config/db.js");
const matchRoutes = require("./routes/matchRoute.js");
const app = express();
app.use(express.json());

const cors = require("cors");



connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use("/api/match",matchRoutes);

app.listen(5003, ()=>{
    console.log("match service running on 5003");
})