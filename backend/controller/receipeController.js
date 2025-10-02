import Recipe from "../model/receipeModel.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";

// Create recipe
export const createRecipe = async (req, res) => {
  try {
    const {
      category,
      title,
      description,
      ingredients,
      instructions,
      tags,
      cuisine,
      prepTime,
      isPublic,
    } = req.body;

    const parsedIngredients = JSON.parse(ingredients || "[]");
    const parsedInstructions = JSON.parse(instructions || "[]");
    const parsedTags = JSON.parse(tags || "[]");
    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.imageUrl;

    if (imageUrl && !/\.(jpg|jpeg|png)$/i.test(imageUrl)) {
      return res
        .status(400)
        .json({ message: "Only JPG or PNG images allowed" });
    }

    const newRecipe = new Recipe({
      user: req.user._id, // ✅ use authenticated user
      category,
      title,
      description,
      ingredients: parsedIngredients,
      instructions: parsedInstructions,
      tags: parsedTags,
      cuisine,
      prepTime,
      imageUrl,
      isPublic,
    });

    const savedRecipe = await newRecipe.save();

    const populatedRecipe = await Recipe.findById(savedRecipe._id)
      .populate("user", "name email")
      .populate("category", "name imageUrl");

    res.status(201).json(populatedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all recipes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate("user", "name email")
      .populate("category", "name imageUrl");
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get recipe by ID

export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate("user", "name email")          // recipe owner
      .populate("category", "name imageUrl")   // category info
      .populate("comments.user", "name email") // comment authors
      .populate("ratings.user", "name email"); // rating authors

    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    res.status(200).json(recipe);
  } catch (err) {
    console.error("getRecipeById error:", err);
    res.status(500).json({ message: err.message });
  }
};


// Update recipe
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this recipe" });
    }

    const {
      title,
      description,
      ingredients,
      instructions,
      cuisine,
      prepTime,
      isPublic,
      imageUrl: bodyImageUrl,
    } = req.body;

    if (req.file) {
      const result = await cloudinaryUpload(req.file.path);
      recipe.imageUrl = result.secure_url;
    } else if (bodyImageUrl) {
      if (!/\.(jpg|jpeg|png)$/i.test(bodyImageUrl)) {
        return res
          .status(400)
          .json({ message: "Only JPG or PNG images allowed for imageUrl" });
      }
      recipe.imageUrl = bodyImageUrl;
    }

    recipe.title = title || recipe.title;
    recipe.description = description || recipe.description;
    recipe.ingredients = ingredients
      ? JSON.parse(ingredients)
      : recipe.ingredients;
    recipe.instructions = instructions
      ? JSON.parse(instructions)
      : recipe.instructions;
    recipe.cuisine = cuisine || recipe.cuisine;
    recipe.prepTime = prepTime ?? recipe.prepTime;
    recipe.isPublic = isPublic ?? recipe.isPublic;

    const updated = await recipe.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete recipe
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this recipe" });
    }

    await recipe.deleteOne();
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get recipes by user
export const getRecipesByUserId = async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.params.userId })
      .populate("user", "name email")
      .populate("category", "name imageUrl");
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRecipesByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res
        .status(400)
        .json({ message: "Recipe name is required for search." });
    }

    const recipes = await Recipe.find({
      title: { $regex: name, $options: "i" }, // case-insensitive search
    })
      .populate("user", "name email")
      .populate("category", "name");

    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecipesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Validate category ID
    if (!categoryId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    // Find recipes matching the category
    const recipes = await Recipe.find({ category: categoryId })
      .populate("user", "name email") // optional: include user fields
      .populate("category", "name"); // optional: include category name only

    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Rate recipe
export const rateRecipe = async (req, res) => {
  console.log("Params:", req.params);
  console.log("Authenticated user:", req.user?._id);

  try {
    const { rating } = req.body;
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be 1–5" });
    }

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    const existing = recipe.ratings.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (existing) existing.value = rating;
    else recipe.ratings.push({ user: req.user._id, value: rating });

    await recipe.save();

    res.status(200).json({
      message: "Rating added/updated",
      ratings: recipe.ratings,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Toggle favorite
export const toggleFavorite = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    const userId = req.user._id;
    if (recipe.favorites.includes(userId)) {
      recipe.favorites = recipe.favorites.filter(
        (id) => id.toString() !== userId.toString()
      );
      await recipe.save();
      return res.status(200).json({
        message: "Removed from favorites",
        favorites: recipe.favorites,
      });
    } else {
      recipe.favorites.push(userId);
      await recipe.save();
      return res
        .status(200)
        .json({ message: "Added to favorites", favorites: recipe.favorites });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserFavorites = async (req, res) => {
  console.log("GET /favorites/:userId hit with userId:", req.params.userId);
  try {
    const { userId } = req.params;
    const recipes = await Recipe.find({ favorites: userId })
      .populate("user", "name email")
      .populate("category", "name");

    console.log("Found recipes:", recipes.length);
    res.status(200).json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Add comment


export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    // Find recipe
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // Add new comment
    recipe.comments.push({ user: req.user._id, text });
    await recipe.save();

    // Re-fetch recipe with populated fields
    const updatedRecipe = await Recipe.findById(req.params.id)
      .populate("user", "name email")          // Recipe owner
      .populate("category", "name imageUrl")   // Category
      .populate({
        path: "comments.user",
        select: "name email",
      })
      .populate({
        path: "ratings.user",
        select: "name email",
      });

    res.status(201).json({
      message: "Comment added",
      recipe: updatedRecipe, // Return full recipe for frontend
    });
  } catch (err) {
    console.error("addComment error:", err);
    res.status(500).json({ message: err.message });
  }
};
