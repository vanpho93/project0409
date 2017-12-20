import * as assert from 'assert';
import * as request from 'supertest';
import { app } from '../../../src/app';
import { Story } from '../../../src/models/Story';
import { User } from '../../../src/models/User';

describe.only('Test DELETE /story/:id', () => {
    let token1;
    let token2;
    let idUser1;
    let idUser2;
    let idStory1;
    let idStory2;
    beforeEach('Sign up, sign in to get token for test', async () => {
        await User.signUp('pho@gmail.com', '123', 'Pho');
        await User.signUp('ohp@gmail.com', '123', 'Pho');
        const response1 = await User.signIn('pho@gmail.com', '123');
        token1 = response1.token;
        idUser1 = response1.user._id;
        const response2 = await User.signIn('ohp@gmail.com', '123');
        token2 = response2.token;
        idUser2 = response2.user._id;
        const story1 = await Story.addStory(idUser1, 'Javascript');
        const story2 = await Story.addStory(idUser2, 'Javascript');
        idStory1 = story1._id;
        idStory2 = story2._id;
    });

    it('Can remove story with right token', async () => {
        const response = await request(app).delete(`/story/${idStory1}`).set({ token: token1 });
        assert.equal(response.status, 200);
        const count = await Story.count({});
        assert.equal(count, 1);
        const user1 = await User.findById(idUser1) as User;
        assert.equal(user1.stories.length, 0);
    });

    it('Cannot remove story with other\'s token', async () => {

    });
});
