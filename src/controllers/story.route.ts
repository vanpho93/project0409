import { json } from 'body-parser';
import { Router } from 'express';
import { Story } from '../models/Story';
import { RequestWithUser } from '../types';
import { userMiddleware } from './userMiddleware';

export const storyRoute = Router();

storyRoute.use(userMiddleware);
storyRoute.use(json());
storyRoute.post('/', (req: RequestWithUser, res) => {
    Story.addStory(req.userId, req.body.content)
    .then(story => res.send({ success: true, story }))
    .catch(error => res.status(404).send({ success: false, error: error.message }));
});

storyRoute.delete('/:idStory', (req: RequestWithUser, res) => {
    Story.removeStory(req.userId, req.params.idStory)
    .then(story => res.send({ success: true, story }))
    .catch(error => res.status(404).send({ success: false, error: error.message }));
});
