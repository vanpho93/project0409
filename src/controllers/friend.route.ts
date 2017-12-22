import { json } from 'body-parser';
import { Router } from 'express';
import { UserService } from '../models/UserService';
import { RequestWithUser } from '../types';
import { userMiddleware } from './userMiddleware';

export const friendRoute = Router();

friendRoute.use(userMiddleware);
friendRoute.use(json());

friendRoute.post('/sendRequest', (req: RequestWithUser, res) => {
    const { idReceiver } = req.body;
    UserService.sendFriendRequest(req.userId, idReceiver)
    .then(() => res.send({ success: true, message: 'Created' }))
    .catch(err => res.status(404).send({ success: false, message: err.message }));
});

friendRoute.post('/acceptRequest', (req: RequestWithUser, res) => {
    const { idSender } = req.body;
    UserService.acceptFriendRequest(req.userId, idSender)
    .then(() => res.send({ success: true, message: 'Accepted' }))
    .catch(err => res.status(404).send({ success: false, message: err.message }));
});

friendRoute.post('/declineRequest', (req: RequestWithUser, res) => {
    const { idSender } = req.body;
    UserService.removeFriendRequest(idSender, req.userId)
    .then(() => res.send({ success: true, message: 'Declined' }))
    .catch(err => res.status(404).send({ success: false, message: err.message }));
});

friendRoute.post('/removeRequest', (req: RequestWithUser, res) => {
    const { idReceiver } = req.body;
    UserService.removeFriendRequest(req.userId, idReceiver)
    .then(() => res.send({ success: true, message: 'Removed' }))
    .catch(err => res.status(404).send({ success: false, message: err.message }));
});
