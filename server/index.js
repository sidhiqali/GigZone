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
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: 'https://gigzone.netlify.app',
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/gigs', gigRoute);
app.use('/api/messages', messageRoute);
app.use('/api/order', orderRoute);
app.use('/api/review', reviewRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong';
  res.status(errorStatus).send(errorMessage);
});

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(port, () => {
      console.log(`Server connected at port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
