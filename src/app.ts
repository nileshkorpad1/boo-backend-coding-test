import express from 'express';
import profileRouter from './routes/profileRoutes';
import commentRouter from './routes/commentRoutes';
import voteRouter from './routes/voteRoutes';

const app = express();

app.use(express.json());
app.use('/api/profiles', profileRouter);
app.use('/api/comments', commentRouter);
app.use('/api/votes', voteRouter);

export default app;
