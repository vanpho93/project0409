import { json } from 'body-parser';
import { Router } from 'express';
import { User } from '../models/User';

export const userRoute = Router();

userRoute.use(json());

userRoute.post('/signup', (req, res) => {
    const { email, password, name } = req.body;
    User.signUp(email, password, name)
    .then(userInfo => res.send({ success: true, user: userInfo }))
    .catch(error => res.status(404).send({ success: false, error: error.message }));
});

userRoute.post('/signin', (req, res) => {
    const { email, password } = req.body;
    User.signIn(email, password)
    .then(response => res.send({ success: true, response }))
    .catch(error => res.status(404).send({ success: false, error: error.message }));
});

userRoute.post('/check', (req, res) => {
    const { token } = req.headers;
    User.check(token as string)
    .then(response => res.send({ success: true, response }))
    .catch(error => res.status(404).send({ success: false, error: error.message }));
});
