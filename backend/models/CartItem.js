import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  cart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },

});

export default mongoose.model('CartItem', cartItemSchema);
