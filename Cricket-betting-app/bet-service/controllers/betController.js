const Bet = require("../models/Bet.js");
const axios = require("axios");

// Place a bet
exports.placeBet = async (req, res) => {
  try {
    const userId = req.user.id;
    const { matchId, team, amount, odds } = req.body;

    // wallet deduct
    await axios.post("http://localhost:5002/api/user/deduct", {
      userId,
      amount,
    });

    const bet = new Bet({
      userId,
      matchId,
      team,
      amount,
      odds,
    });

    await bet.save();

    res.json({ message: "Bet placed", bet });
  } catch (err) {
     console.log(err.response?.data);
    console.error("BET ERROR:", err.message);
    res.status(400).send("Bet failed: " + err.message);
  }
};

// SETTLE BET (after match result is declared)
exports.settleBets = async (req, res) => {
  try {
    const { matchId, winner } = req.body;

    const bets = await Bet.find({ matchId });

    for (let bet of bets) {
      if (bet.team === winner) {
        const winAmount = bet.amount * bet.odds;

        await axios.post("http://localhost:5002/user/add", {
          userId: bet.userId,
          amount: winAmount,
        });

        bet.status = "WON";
      } else {
        bet.status = "LOST";
      }

      await bet.save();
    }

    res.send("Settlement done");
  } catch (err) {
    console.error("SETTLE ERROR:", err.message);
    res.status(500).send(err.message);
  }
};

// 🔹 Get user bet history
exports.getUserBets = async (req, res) => {
  try {
    const userId = req.user.id;

    const bets = await Bet.find({ userId }).sort({ createdAt: -1 });

    res.json(bets);
  } catch (err) {
    console.error("BET HISTORY ERROR:", err.message);
    res.status(500).json({ msg: err.message });
  }
};

// 🔹 Admin: Get all bets
exports.getAllBets = async (req, res) => {
  const bets = await Bet.find().sort({ createdAt: -1 });
  res.json(bets);
};