import * as assert from 'assert';
import * as request from 'supertest';
import { app } from '../../../src/app';
import { Story } from '../../../src/models/Story';
import { User } from '../../../src/models/User';

describe.only('Test POST /story', () => {
    let token;
    let idUser;
    beforeEach('Sign up, sign in to get token for test', async () => {
        await User.signUp('pho@gmail.com', '123', 'Pho');
        const response = await User.signIn('pho@gmail.com', '123');
        token = response.token;
        idUser = response.user._id;
    });

    it('Can add new story for user with token', async () => {
        await request(app)
        .post('/story')
        .set({ token })
        .send({ content: 'Javascript' });
        const story = await Story.findOne({ }).populate('author') as Story;
        const user = await User.findOne({ });
        assert.equal(story.author.name, 'Pho');
    });
});
