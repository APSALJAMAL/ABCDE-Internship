import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  name: { type: String },
  status: { type: String },
  created_at: { type: Date, default: Date.now }
});

cartSchema.index({ user_id: 1 }, { unique: true });



export default mongoose.model('Cart', cartSchema);
