import * as assert from 'assert';
import * as request from 'supertest';
import { app } from '../../../src/app';
import { User } from '../../../src/models/User';

describe('Test POST /user/signin', () => {
    beforeEach('Sign up 1 user for test', async () => {
        await User.signUp('pho@gmail.com', '123', 'Pho');
    });

    it ('Can sign in with right info', async () => {
        const response = await request(app)
        .post('/user/signin')
        .send({ email: 'pho@gmail.com', password: '123' });
        assert.equal(response.status, 200);
        assert.equal(response.body.response.user.name, 'Pho');
    });
});
