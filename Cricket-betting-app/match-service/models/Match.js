const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    teamA: {
      type: String,
      required: [true, "Team A name is required"],
      trim: true,
    },
    teamB: {
      type: String,
      required: [true, "Team B name is required"],
      trim: true,
    },

    oddsA: {
      type: Number,
      required: [true, "Odds for Team A are required"],
      min: [1, "Odds must be greater than 0"],
    },
    oddsB: {
      type: Number,
      required: [true, "Odds for Team B are required"],
      min: [1, "Odds must be greater than 0"],
    },

    status: {
      type: String,
      enum: ["UPCOMING", "LIVE", "CLOSED"],
      default: "UPCOMING",
      index: true, // 🔥 useful for queries like "find all LIVE matches"
    },

    startTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// Optional: compound index to avoid duplicate matches
matchSchema.index({ teamA: 1, teamB: 1, startTime: 1 }, { unique: true });

module.exports = mongoose.model("Match", matchSchema);