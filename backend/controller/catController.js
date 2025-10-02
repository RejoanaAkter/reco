import Category from '../model/catModel.js';

// ✅ Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Check required fields
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Category image is required' });
    }

    // Validate image file extension
    if (!/\.(jpg|jpeg|png)$/i.test(req.file.originalname)) {
      return res.status(400).json({ message: 'Only JPG or PNG images are allowed' });
    }

    // Check if category already exists
    const exists = await Category.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const category = new Category({ name, imageUrl });
    const savedCategory = await category.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 }); // Sort alphabetically
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: error.message });
  }
};
