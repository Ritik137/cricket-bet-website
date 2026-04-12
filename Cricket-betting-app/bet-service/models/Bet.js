const mongoose = require("mongoose");

const betSchema = new mongoose.Schema({
    userId: String,
    matchId: String,

    team: String,  // teamA or teamB
    amount: Number,
    odds: Number,

    status: {
        type: String,
        default: "PENDING" // PENDING | WON | LOST
    }
}, { timestamps: true });   // ✅ comma lagao aur options yahan pass karo

module.exports = mongoose.model("Bet", betSchema);