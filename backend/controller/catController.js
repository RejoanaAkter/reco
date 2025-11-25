import Category from '../model/catModel.js';
import { cloudinaryUpload } from '../utils/cloudinary.js';

export const createCategory = async (req, res) => {
try {
const { name } = req.body;
if (!name) return res.status(400).json({ message: 'Category name is required' });
if (!req.file) return res.status(400).json({ message: 'Category image is required' });
const result = await cloudinaryUpload(req.file.buffer); // upload directly to Cloudinary
const category = new Category({
name,
imageUrl: result.secure_url, });
const savedCategory = await category.save();
res.status(201).json(savedCategory);
} catch (err) {
console.error(err);
res.status(500).json({ message: err.message });
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