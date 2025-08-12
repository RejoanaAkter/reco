import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  update,
  loginUser,
} from "../controller/userController.js";
import { upload } from "../middleware/multer.js";
import { authenticate } from "../middleware/authMiddleware.js"; // ✅ import auth

const route = express.Router();

route.post("/login", loginUser);
route.post("/user", upload.single("image"), createUser);

// 🔐 Protect these routes if needed
route.get("/users", getAllUsers);
route.get("/user/:id", getUserById);
route.put("/update/user/:id", update);
route.delete("/delete/user/:id", deleteUser);

export default route;
