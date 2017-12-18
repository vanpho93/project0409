import * as express from 'express';
import { storyRoute } from './controllers/story.route';
import { userRoute } from './controllers/user.route';

export const app = express();

app.use('/user', userRoute);
app.use('/story', storyRoute);
app.get('/', (req, res) => res.send('123'));
