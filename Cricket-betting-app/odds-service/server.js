require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const axios = require("axios");

const { updateOdds } = require("./services/oddsEngine");

const app = express();
app.use(cors());

const server = http.createServer(app);

// 🔌 Socket setup
const io = new Server(server, {
  cors: { origin: "*" }
});

// 🧠 Connected users log + ROOM JOIN 🔥
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  // ✅ 👉 YAHAN CHANGE KIYA (room join)
  socket.join("all-users");

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// 🔄 Fetch matches
async function fetchMatches() {
  try {
    const res = await axios.get(process.env.MATCH_SERVICE_URL);
    return res.data;
  } catch (err) {
    console.error("❌ MATCH FETCH ERROR:", err.message);
    return [];
  }
}

// 🔥 Real-time odds loop
setInterval(async () => {
  try {
    let matches = await fetchMatches();

    if (!matches.length) return;

    const updated = updateOdds(matches);

    // ❌ OLD
    // io.emit("oddsUpdate", updated);

    // ✅ 👉 YAHAN CHANGE KIYA (room emit)
    io.to("all-users").emit("oddsUpdate", updated);

    console.log("📡 Odds updated:", updated.length, "matches");

  } catch (error) {
    console.error("❌ ODDS LOOP ERROR:", error.message);
  }
}, 2000);

// 🧪 Health check
app.get("/", (req, res) => {
  res.send("Odds Service Running ✅");
});

const PORT = process.env.PORT || 5005;

server.listen(PORT, () => {
  console.log(`🚀 Odds Service running on ${PORT}`);
});