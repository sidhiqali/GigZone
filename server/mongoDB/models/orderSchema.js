import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    gigId: {
      type: 'string',
      required: true,
    },
    img: {
      type: 'string',
      required: false,
    },
    title: {
      type: 'string',
      required: true,
    },
    price: {
      type: 'number',
      required: true,
    },
    sellerId: {
      type: 'string',
      required: true,
    },
    buyerId: {
      type: 'string',
      required: true,
    },
    isCompleted: {
      type: 'Boolean',
      required: true,
      default: false,
    },
    payment_intent: {
      type: 'string',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Order', orderSchema);
