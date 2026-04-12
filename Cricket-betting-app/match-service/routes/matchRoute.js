const express = require("express");
const router = express.Router();

const {
  createMatch,
  getMatches,
  updateStatus
} = require("../controllers/matchController");

const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

// 🔓 Public
router.get("/get-match", getMatches);

// 🔒 Admin only
router.post("/post-by-admin", protect, isAdmin, createMatch);
router.put("/:id/status", protect, isAdmin, updateStatus);

module.exports = router;