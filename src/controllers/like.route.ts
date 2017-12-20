import { json } from 'body-parser';
import { Router } from 'express';
import { Story } from '../models/Story';
import { RequestWithUser } from '../types';
import { userMiddleware } from './userMiddleware';

export const likeRoute = Router();

likeRoute.use(userMiddleware);

likeRoute.put('/:idStory', json(), (req: RequestWithUser, res) => {
    const { isLike } = req.body;
    const { idStory } = req.params;
    if (isLike) return Story.likeStory(req.userId, idStory)
    .then(story => res.send({ success: true, story }))
    .catch(error => res.status(404).send({ success: false, error: error.message }));

    Story.dislikeStory(req.userId, idStory)
    .then(story => res.send({ success: true, story }))
    .catch(error => res.status(404).send({ success: false, error: error.message }));
});
