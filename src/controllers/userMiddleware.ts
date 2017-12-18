import { Request, Response } from 'express';
import { verifyToken } from '../helpers/jwt';

export const userMiddleware = (req: any, res: Response, next: () => void) => {
    const { token } = req.headers;
    if (!token) return res.status(404).send({ success: false, message: 'Invalid token' });
    verifyToken(token)
    .then(userObj => {
        req.userId = userObj._id;
        next();
    })
    .catch(err => res.status(404).send({ success: false, message: 'Invalid token' }));
};
