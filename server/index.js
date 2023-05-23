import express from 'express';
import dotenv from 'dotenv';
import connectDB from './mongoDB/connect.js';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import conversationRoute from './routes/conversationRoute.js';
import gigRoute from './routes/gigRoute.js';
import messageRoute from './routes/messageRoute.js';
import orderRoute from './routes/orderRoute.js';
import reviewRoute from './routes/reviewRoute.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/conversation', conversationRoute);
app.use('/api/gig', gigRoute);
app.use('/api/message', messageRoute);
app.use('/api/order', orderRoute);
app.use('/api/review', reviewRoute);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(port, () => {
      console.log(
        `server connected at port ${port} successfully. http://localhost:${port}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
