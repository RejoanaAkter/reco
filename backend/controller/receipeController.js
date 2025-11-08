import Recipe from "../model/receipeModel.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";

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

    // ✅ Safely parse JSON fields (in case frontend sends them as strings)
    const parsedIngredients = safeJSONParse(ingredients, []);
    const parsedInstructions = safeJSONParse(instructions, []);
    const parsedTags = safeJSONParse(tags, []);

    // ✅ Handle image upload
    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.imageUrl || "";

    // ✅ Validate image format
    if (imageUrl && !/\.(jpg|jpeg|png)$/i.test(imageUrl)) {
      return res
        .status(400)
        .json({ message: "Only JPG or PNG images are allowed." });
    }

    // ✅ Create new recipe
    const newRecipe = new Recipe({
      user: req.user._id,
      category,
      title,
      description,
      ingredients: parsedIngredients,
      instructions: parsedInstructions,
      tags: parsedTags,
      cuisine,
      prepTime,
      imageUrl,
      isPublic:
        isPublic === true ||
        isPublic === "true" ||
        isPublic === 1 ||
        isPublic === "1",
    });

    const savedRecipe = await newRecipe.save();

    // ✅ Populate related fields
    const populatedRecipe = await Recipe.findById(savedRecipe._id)
      .populate("user", "name email")
      .populate("category", "name imageUrl");

    res.status(201).json(populatedRecipe);
  } catch (error) {
    console.error("❌ createRecipe error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};


export const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      cuisine,
      prepTime,
      isPublic,
      ingredients,
      instructions,
      tags,
    } = req.body;

    // ✅ Safely parse JSON fields
    const parsedIngredients = safeJSONParse(ingredients, []);
    const parsedInstructions = safeJSONParse(instructions, []);
    const parsedTags = safeJSONParse(tags, []);

    // ✅ Build updated data
    const updatedData = {
      title: title?.trim() || "",
      description: description?.trim() || "",
      category: category || null,
      cuisine: cuisine?.trim() || "",
      prepTime: prepTime ? Number(prepTime) : 0,
      isPublic:
        isPublic === true ||
        isPublic === "true" ||
        isPublic === 1 ||
        isPublic === "1",
      ingredients: parsedIngredients,
      instructions: parsedInstructions,
      tags: parsedTags,
    };

    // ✅ Handle new image upload
    if (req.file) {
      updatedData.imageUrl = `/uploads/${req.file.filename}`;
    }

    // ✅ Update in DB and populate
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updatedData, {
      new: true,
    })
      .populate("user", "name email")
      .populate("category", "name imageUrl");

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found." });
    }

    res.status(200).json({
      message: "✅ Recipe updated successfully.",
      recipe: updatedRecipe,
    });
  } catch (error) {
    console.error("❌ updateRecipe error:", error);
    res.status(500).json({
      message: error.message || "Server error while updating recipe.",
    });
  }
};


function safeJSONParse(value, fallback) {
  try {
    if (!value) return fallback;
    return typeof value === "string" ? JSON.parse(value) : value;
  } catch (err) {
    console.warn("⚠️ JSON parse failed:", value);
    return fallback;
  }
}


export const getAllRecipes = async (req, res) => {
  try {
    const { category, cuisine, name, page = 1, limit = 10, sort = "desc" } = req.query;

    const filter = {}; // <-- remove : any

    if (category && category !== "all") filter.category = category;
    if (cuisine && cuisine !== "all") filter.cuisine = cuisine;
    if (name) filter.title = { $regex: name, $options: "i" };

    const total = await Recipe.countDocuments(filter);

    const skip = (Number(page) - 1) * Number(limit);

    const recipes = await Recipe.find(filter)
      .populate("user", "name email")
      .populate("category", "name imageUrl")
      .populate("cuisine", "name")
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      recipes,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate("user", "name email")
      .populate("category", "name imageUrl")
      .populate("cuisine", "name") // ✅ populate cuisine
      .populate("comments.user", "name email")
      .populate("ratings.user", "name email");

    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    res.status(200).json(recipe);
  } catch (err) {
    console.error("getRecipeById error:", err);
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
