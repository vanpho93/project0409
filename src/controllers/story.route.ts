import { json } from 'body-parser';
import { Router } from 'express';
import { Story } from '../models/Story';
import { RequestWithUser } from '../types';
import { userMiddleware } from './userMiddleware';

export const storyRoute = Router();

storyRoute.use(json());

storyRoute.post('/', userMiddleware, (req: RequestWithUser, res) => {
    Story.addStory(req.userId, req.body.content)
    .then(story => res.send({ success: true, story }))
    .catch(error => res.status(404).send({ success: false, error: error.message }));
});
