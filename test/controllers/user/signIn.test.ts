import * as assert from 'assert';
import * as request from 'supertest';
import { app } from '../../../src/app';
import { User } from '../../../src/models/User';

describe.only('Test POST /signup', () => {
    it('Can sign up with full info', async () => {
        const body = { email: 'a@gmail.com', password: '123', name: 'Pho' };
        await request(app).post('/signup').send(body);
        const user = await User.findOne({ email: 'a@gmail.com' }) as User;
        assert.equal(user.name, 'Pho');
    });

    it('Cannot sign up with dup email', async () => {
        await User.signUp('vanpho1@gmail.com', '123', 'Pho');
        const body = { email: 'vanpho1@gmail.com', password: '123', name: 'Pho' };
        const res = await request(app).post('/signup').send(body);
        assert.equal(res.body.success, false);
        assert.equal(res.status, 404);
    });
});
