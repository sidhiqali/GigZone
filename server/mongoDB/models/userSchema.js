import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: 'string',
    required: true,
    unique: true,
  },
  email: {
    type: 'string',
    required: true,
    unique: true,
  },
  password: {
    type: 'string',
    required: true,
  },
  img: {
    type: 'string',
    required: false,
  },
  country: {
    type: 'string',
    required: true,
  },
  phone: {
    type: 'string',
    required: false,
  },
  desc: {
    type: 'string',
    required: false,
  },
  isSeller: {
    type: 'boolean',
    default: false,
  },
},
{
  timestamps: true,
});

export default mongoose.model('User', userSchema);
