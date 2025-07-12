import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('Item', itemSchema);
