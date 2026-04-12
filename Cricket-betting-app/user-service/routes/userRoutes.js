const express = require("express");
const router = express.Router();

const {
  createWallet,
  getWallet,
  addMoney,
  deductMoney
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

// 🔒 User
router.post("/create-wallet", protect, createWallet);
router.get("/getwallet", protect, getWallet);

// 👑 ONLY ADMIN CAN ADD MONEY
router.post("/add-money", protect, isAdmin, addMoney);

// 🔓 Internal (bet-service)
router.post("/deduct", deductMoney);

// admin can see all users
router.get("/all-users", protect, isAdmin, async (req, res) => {
  const users = await User.find().select("_id email role");
  res.json(users);
});

module.exports = router;