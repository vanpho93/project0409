import * as express from 'express';
import { userRoute } from './controllers/user.route';

export const app = express();

app.use('/user', userRoute);
app.get('/', (req, res) => res.send('123'));
