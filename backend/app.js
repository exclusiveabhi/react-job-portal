import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import userRouter from './routes/userRouter.js';
import jobRouter from './routes/jobRouter.js';
import applicationRouter from './routes/applicationRouter.js';
import dbConnection from './database/dbConnection.js';
import errorMiddleware from './middleware/error.js';

dotenv.config({ path: './config/config.env' });

const app = express();

// Use CORS middleware!
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true
}));

app.use(cookieParser());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes with version!
app.use('/api/v1/user', userRouter);
app.use('/api/v1/job', jobRouter);
app.use('/api/v1/application', applicationRouter);

//Database connection call here!
dbConnection();

// Error middleware!
app.use(errorMiddleware);

export default app;
