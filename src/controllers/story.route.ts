import { json } from 'body-parser';
import { Router } from 'express';
import { Story } from '../models/Story';
import { userMiddleware } from './userMiddleware';

export const storyRoute = Router();

storyRoute.use(json());

storyRoute.post('/', userMiddleware, (req: any, res) => {
    Story.addStory(req.userId, req.body.content)
    .then(story => res.send({ success: true, story }))
    .catch(error => res.status(404).send({ success: false, error: error.message }));
});
