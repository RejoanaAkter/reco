import express from 'express';
import { createRecipe, getAllRecipes,checkRecipeOwner, getRecipeById, updateRecipe, deleteRecipe, getUserWithRecipes, getRecipesByCategory, getRecipesByName } from '../controller/receipeController.js';
import { upload } from '../middleware/multer.js';

const receipeRoute = express.Router();  // <--- you must have this line
// receipeRoute.post('/recipe', upload.single('image'), createRecipe);

receipeRoute.post('/recipe', upload.single('image'), createRecipe);
receipeRoute.get('/recipes', getAllRecipes);
receipeRoute.get('/recipe/search', getRecipesByName);
receipeRoute.get('/recipe/:id', getRecipeById);
receipeRoute.put('/update/recipe/:id', updateRecipe);
receipeRoute.delete('/delete/recipe/:id', deleteRecipe);
receipeRoute.get('/user/:userId', getUserWithRecipes);
receipeRoute.get('/category/:categoryId', getRecipesByCategory);
receipeRoute.post('/check-recipe-owner', checkRecipeOwner); // ✅ ADD THIS

export default receipeRoute;
