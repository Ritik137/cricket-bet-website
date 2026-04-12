// 🔹 Admin only
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Admin access only" });
  }
  next();
};

// 🔹 User only (optional)
exports.isUser = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ msg: "User access only" });
  }
  next();
};