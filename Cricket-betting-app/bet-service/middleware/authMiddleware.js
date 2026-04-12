const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers["x-access-token"];

  console.log("AUTH HEADER:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ msg: "No token provided" });
  }

  // ✅ case-insensitive check
  if (!authHeader.toLowerCase().startsWith("bearer")) {
    return res.status(401).json({ msg: "Invalid token format" });
  }

  try {
    const token = authHeader.split(" ")[1];

    console.log("TOKEN EXTRACTED:", token); // 🔥 DEBUG

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id, role }

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message); // 🔥 DEBUG
    return res.status(401).json({ msg: "Invalid token" });
  }
};