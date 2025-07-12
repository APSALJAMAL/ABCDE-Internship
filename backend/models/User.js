import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String },
  cart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
