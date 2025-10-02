import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

// Helper: Generate JWT
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id.toString(), // always string
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Register new user
export const createUser = async (req, res) => {
  try {
    const { name, email, address, password, about } = req.body;
    if (!name || !email || !address || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const newUser = new User({
      name,
      email,
      address,
      password: hashedPassword,
      about,
      image: imageUrl,
    });

    const savedUser = await newUser.save();
    const token = generateToken(savedUser);

    res.status(201).json({
      message: "User created",
      token,
      user: {
        id: savedUser._id.toString(),
        name: savedUser.name,
        email: savedUser.email,
        address: savedUser.address,
        image: savedUser.image,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        address: user.address,
        image: user.image,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users (protected)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID (protected)
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user (protected & ownership check)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user._id.toString() !== id) return res.status(403).json({ message: "Unauthorized" });

    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true }).select("-password");
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user (protected & ownership check)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user._id.toString() !== id) return res.status(403).json({ message: "Unauthorized" });

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generic update (protected)
export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) return res.status(404).json({ message: "User not found." });

    await User.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
