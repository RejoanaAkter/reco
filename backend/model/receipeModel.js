
import mongoose from "mongoose"

const recipeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
        title: String,
        description: String,
        ingredients: [String],
        instructions: [String], 
        tags: [String],
        cuisine: { type: mongoose.Schema.Types.ObjectId, ref: 'Cuisine' },
        prepTime:Number,
        cookingTime:Number,
        imageUrl: String,
        isPublic: Boolean,

    // ⭐ Ratings
    ratings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        value: { type: Number, min: 1, max: 5 },
      },
    ],

    // ❤️ Favorites
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // 💬 Comments
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipes", recipeSchema);
export default Recipe;
