import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    id: {
      type: 'string',
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
    readBySeller: {
      type: 'Boolean',
      required: true,
      default: false,
    },
    readByBuyer: {
      type: 'Boolean',
      required: true,
      default: false,
    },
    lastMessage: {
      type: 'string',
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Conversation', conversationSchema);
