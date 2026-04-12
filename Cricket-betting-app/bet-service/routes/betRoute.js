const express = require("express");
const router = express.Router();

const { placeBet, settleBets , getUserBets, getAllBets} = require("../controllers/betController");

const { protect } = require("../middleware/authMiddleware");
const { isUser, isAdmin } = require("../middleware/roleMiddleware");


// 🔒 User only
router.post("/place-bet", protect, isUser, placeBet);

// 🔒 Admin only (later)
router.post("/settle", settleBets);

router.get("/get-my-bets", protect, isUser, getUserBets);

// 🔒 Admin only see all bets
router.get("/all", protect, isAdmin, getAllBets);
module.exports = router;