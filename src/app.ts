import { json } from 'body-parser';
import * as express from 'express';
import { User } from './models/User';

export const app = express();

app.get('/', (req, res) => res.send('123'));

app.post('/signup', json(), (req, res) => {
    const { email, password, name } = req.body;
    User.signUp(email, password, name)
    .then(userInfo => res.send({ success: true, user: userInfo }))
    .catch(error => res.status(404).send({ success: false, error: error.message }));
});

app.post('/signin', json(), (req, res) => {
    const { email, password } = req.body;
    User.signIn(email, password)
    .then(response => res.send({ success: true, response }))
    .catch(error => res.status(404).send({ success: false, error: error.message }));
});

app.post('/check', (req, res) => {
    const { token } = req.headers;
    User.check(token as string)
    .then(response => res.send({ success: true, response }))
    .catch(error => res.status(404).send({ success: false, error: error.message }));
});
