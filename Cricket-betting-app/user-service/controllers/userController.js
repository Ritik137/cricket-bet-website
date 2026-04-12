const Wallet = require("../models/UserWallet");

// 🔹 Create wallet
exports.createWallet = async (req, res) => {
  try {
    const userId = req.user.id;

    const exists = await Wallet.findOne({ userId });
    if (exists) {
      return res.status(400).json({ msg: "Wallet already exists" });
    }

    const wallet = await Wallet.create({ userId });

    res.status(201).json(wallet);
  } catch (err) {
    console.error("CREATE WALLET ERROR:", err.message);
    res.status(500).json({ msg: err.message });
  }
};

// 🔹 Get wallet
exports.getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.user.id });

    if (!wallet) {
      return res.status(404).json({ msg: "Wallet not found" });
    }

    res.json(wallet);
  } catch (err) {
    console.error("GET WALLET ERROR:", err.message);
    res.status(500).json({ msg: err.message });
  }
};

// 🔹 Add money
// 🔹 Admin adds money to any user
exports.addMoney = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    const wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      return res.status(404).json({ msg: "Wallet not found" });
    }

    wallet.balance += amount;
    await wallet.save();

    res.json({
      msg: "Money added successfully",
      wallet
    });

  } catch (err) {
    console.error("ADD MONEY ERROR:", err.message);
    res.status(500).json({ msg: err.message });
  }
};

// 🔹 Deduct money (used by bet-service)
exports.deductMoney = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    const wallet = await Wallet.findOne({ userId });

    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({ msg: "Insufficient balance" });
    }

    wallet.balance -= amount;
    await wallet.save();

    res.json(wallet);
  } catch (err) {
    console.error("DEDUCT ERROR:", err.message);
    res.status(500).json({ msg: err.message });
  }
};