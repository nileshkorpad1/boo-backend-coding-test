import express from 'express';
import profileRouter from './routes/profileRoutes';
import commentRouter from './routes/commentRoutes';
import voteRouter from './routes/voteRoutes';

const app = express();

app.use(express.json());
app.use('/profiles', profileRouter);
app.use('/comments', commentRouter);
app.use('/votes', voteRouter);

export default app;
