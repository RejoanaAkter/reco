import express from 'express';
import { 
  createRecipe, 
  getAllRecipes,
  getRecipeById, 
  updateRecipe, 
  deleteRecipe,
  getRecipesByUserId, 
  getRecipesByCategory, 
  getRecipesByName, 
  getUserFavorites,
  rateRecipe, 
  toggleFavorite, 
  addComment 
} from '../controller/receipeController.js';
import { upload } from '../middleware/multer.js';
import { authMiddleware } from '../middleware/auth.js';

const receipeRoute = express.Router();

// 🔐 All routes require authentication
receipeRoute.use(authMiddleware);

// Routes
receipeRoute.get('/recipes', getAllRecipes);
receipeRoute.get('/recipe/search', getRecipesByName);
receipeRoute.get('/recipe/:id', getRecipeById);
receipeRoute.get('/category/:categoryId', getRecipesByCategory);
receipeRoute.get('/user/:userId', getRecipesByUserId);


receipeRoute.post("/recipe", upload.single("image"), createRecipe);
receipeRoute.put("/update/recipe/:id", upload.single("image"), updateRecipe);
receipeRoute.delete('/delete/recipe/:id', deleteRecipe);
receipeRoute.post('/recipe/:id/rate', rateRecipe);
receipeRoute.post('/recipe/:id/favorite', toggleFavorite);
receipeRoute.post('/recipe/:id/comment', addComment);
receipeRoute.get("/favorites/:userId", getUserFavorites);

export default receipeRoute;
