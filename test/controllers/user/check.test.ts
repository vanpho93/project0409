import * as assert from 'assert';
import * as request from 'supertest';
import { app } from '../../../src/app';
import { User } from '../../../src/models/User';

describe.only('Test POST /user/check', () => {
    let token;
    beforeEach('Sign up, sign in to get token for test', async () => {
        await User.signUp('pho@gmail.com', '123', 'Pho');
        const response = await User.signIn('pho@gmail.com', '123');
        token = response.token;
    });

    it ('Can check with right token', async () => {
        const response = await request(app)
        .post('/user/check')
        .set({ token });
        assert.equal(response.status, 200);
        assert.equal(response.body.response.user.name, 'Pho');
    });

    it ('Can check with wrong token', async () => {
        const response = await request(app)
        .post('/user/check')
        .set({ token: 'abcd' });
        assert.equal(response.status, 404);
    });
});
