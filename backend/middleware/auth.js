import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Always use string for comparison
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};
