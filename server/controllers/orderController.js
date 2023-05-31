import Gig from '../mongoDB/models/gigSchema.js';
import Order from '../mongoDB/models/orderSchema.js';
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();
export const createOrder = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_KEY);

  try {
    const gig = await Gig.findById(req.params.gigId);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: gig.price * 100,
      currency: 'inr',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    const order = await Order.create({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      price: gig.price,
      sellerId: gig.userId,
      buyerId: req.userId,
      payment_intent: paymentIntent.id,
    });
    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(error);
  }
};
export const getOrders = async (req, res, next) => {
  try {
    const getOrders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });
    res.status(200).send(getOrders);
  } catch (error) {
    next(error);
  }
};
export const confirmOrder = async (req, res, next) => {
  try {
    await Order.findOneAndUpdate(
      { payment_intent: req.body.payment_intent },
      {
        $set: { isCompleted: true },
      }
    );
    res.status(200).send('order has been confirmed');
  } catch (error) {
    next(error);
  }
};
