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
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server);
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'https://gigzone.netlify.app', credentials: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://gigzone.netlify.app');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
app.set('trust proxy', 1);
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/gigs', gigRoute);
app.use('/api/messages', messageRoute);
app.use('/api/order', orderRoute);
app.use('/api/review', reviewRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'something went wrong';
  res.status(errorStatus).send(errorMessage);
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(port, () => {
      console.log(
        `server connected at port ${port} successfully. https://gigzone.netlify.app/`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
