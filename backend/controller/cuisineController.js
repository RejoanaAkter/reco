import Cuisine from '../model/cuisineModel.js';
import Recipe from '../model/receipeModel.js';
import mongoose from 'mongoose';


// ✅ Create a new cuisine
export const createCuisine = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name?.trim()) {
      return res.status(400).json({ message: "Cuisine name is required" });
    }

    // prevent duplicates (case-insensitive)
    const existing = await Cuisine.findOne({ name: { $regex: `^${name}$`, $options: "i" } });
    if (existing) {
      return res.status(200).json(existing); // just return the existing one
    }

    const newCuisine = new Cuisine({ name: name.trim() });
    const saved = await newCuisine.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("❌ createCuisine error:", error);
    res.status(500).json({ message: "Server error creating cuisine" });
  }
};

// ✅ Get all cuisines
export const getAllCuisines = async (req, res) => {
  try {
    const cuisines = await Cuisine.find().sort({ name: 1 });
    res.json(cuisines);
  } catch (error) {
    console.error("❌ getAllCuisines error:", error);
    res.status(500).json({ message: "Server error fetching cuisines" });
  }
};


// ✅ Get recipes by cuisine
export const getRecipesByCuisine = async (req, res) => {
  try {
    const { cuisine } = req.params;

    // find cuisine by id or name
    const cuisineDoc = await Cuisine.findOne({
      $or: [
        { _id: mongoose.Types.ObjectId.isValid(cuisine) ? cuisine : null },
        { name: { $regex: new RegExp(`^${cuisine}$`, 'i') } }
      ]
    });

    if (!cuisineDoc) {
      return res.status(404).json({ message: 'Cuisine not found' });
    }

    const recipes = await Recipe.find({ cuisine: cuisineDoc._id })
      .populate('cuisine', 'name')
      .sort({ name: 1 });

    res.json({ cuisine: cuisineDoc.name, count: recipes.length, recipes });
  } catch (error) {
    console.error('❌ getRecipesByCuisine error:', error);
    res.status(500).json({ message: 'Server error fetching recipes by cuisine' });
  }
};
