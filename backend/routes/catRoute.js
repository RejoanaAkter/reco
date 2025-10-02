import express from 'express';
import { createCategory, getAllCategories } from '../controller/catController.js';
import { upload } from "../middleware/multer.js";
import { authMiddleware } from '../middleware/auth.js'; // import auth middleware

const catRoute = express.Router();

catRoute.use(authMiddleware);

catRoute.post('/category', upload.single('image'), createCategory);
catRoute.get('/categories', getAllCategories);

export default catRoute;
