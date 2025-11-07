

import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { createCuisine, getAllCuisines } from "../controller/cuisineController.js";


const cuisineRoute = express.Router();
cuisineRoute.use(authMiddleware);

cuisineRoute.get("/getAllcuisines", getAllCuisines);
cuisineRoute.post("/craeteCuisine", authMiddleware, createCuisine);

export default cuisineRoute;