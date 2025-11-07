
import mongoose from 'mongoose';

const cuisineSchema = new mongoose.Schema(
 {
  name: { type: String, required: true, unique: true },
  description: String,
}
);

export default mongoose.model('Cuisine', cuisineSchema);
