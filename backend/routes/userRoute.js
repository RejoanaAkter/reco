
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
import { authMiddleware } from '../middleware/auth.js';
// import your auth middleware

const route = express.Router();

// Public routes
route.post("/login", loginUser);
route.post("/user", upload.single("image"), createUser);

// 🔐 Protected routes
route.use(authMiddleware); // all routes below this line require authentication

route.get("/users", getAllUsers);
route.get("/user/:id", getUserById);
route.put("/update/user/:id", update);
route.delete("/delete/user/:id", deleteUser);

export default route;
