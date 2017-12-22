import * as express from 'express';
import { friendRoute } from './controllers/friend.route';
import { likeRoute } from './controllers/like.route';
import { storyRoute } from './controllers/story.route';
import { userRoute } from './controllers/user.route';

export const app = express();

app.use('/user', userRoute);
app.use('/story', storyRoute);
app.use('/like', likeRoute);
app.use('/friend', friendRoute);
app.get('/', (req, res) => res.send('123'));
