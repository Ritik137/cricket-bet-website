const Match = require("../models/Match.js");

// Create match (Admin use)
exports.createMatch = async (req, res) => {
  try {
    console.log("👉 Create Match Body:", req.body);

    const match = new Match(req.body);
    await match.save();

    console.log("✅ Match Created:", match);

    res.json(match);
  } catch (error) {
    console.error("❌ CREATE MATCH ERROR:", error.message);
    res.status(500).json({ msg: error.message });
  }
};

// get all matches
exports.getMatches = async (req, res) => {
  try {
    console.log("👉 Fetching all matches");

    const matches = await Match.find();

    console.log("✅ Matches Found:", matches.length);

    res.json(matches);
  } catch (error) {
    console.error("❌ GET MATCH ERROR:", error.message);
    res.status(500).json({ msg: error.message });
  }
};

// Update match status
exports.updateStatus = async (req, res) => {
  try {
    console.log("👉 Update Status Params:", req.params);
    console.log("👉 Update Status Body:", req.body);

    const { id } = req.params;
    const { status } = req.body;

    const match = await Match.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!match) {
      console.warn("⚠️ Match not found:", id);
      return res.status(404).json({ msg: "Match not found" });
    }

    console.log("✅ Match Updated:", match);

    res.json(match);
  } catch (error) {
    console.error("❌ UPDATE STATUS ERROR:", error.message);
    res.status(500).json({ msg: error.message });
  }
};