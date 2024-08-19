import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import postRouter from './routes/post.route.js';
import announcementRouter from './routes/announcement.route.js';
import userRouter from './routes/user.route.js';
import potentialRouter from './routes/potential.route.js';
import aboutRouter from './routes/about.route.js';
import organizationRouter from './routes/organization.route.js';

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/posts', postRouter);
app.use('/potentials', potentialRouter);
app.use('/announcements', announcementRouter);
app.use('/users', userRouter);
app.use('/about', aboutRouter);
app.use('/organization', organizationRouter);

const PORT = 5050;

app.listen(PORT, () => console.log(`Running on port ${PORT}`));

export default app;
