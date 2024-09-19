import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import { AppDataSource } from './config/data-source';
import authRouter from './routes/authRoutes';
import jobPostingRouter from './routes/jobPostingRoutes';
import errorHandler from './utils/globalErrorHandler';
import jobApplicationRoute from './routes/jobApplicationRoutes';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const { PORT = 3000 } = process.env;

app.use('/api/auth', authRouter);
app.use('/api/jobs', jobPostingRouter);
app.use('/api/applications', jobApplicationRoute);
app.use(errorHandler);

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log('Server is running on http://localhost:' + PORT);
    });
    console.log('Data Source has been initialized!');
  })
  .catch((error) => console.log(error));
