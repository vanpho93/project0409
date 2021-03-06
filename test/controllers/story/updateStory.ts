import * as assert from 'assert';
import * as request from 'supertest';
import { app } from '../../../src/app';
import { Story } from '../../../src/models/Story';
import { User } from '../../../src/models/User';

describe('Test PUT /story/:idStory', () => {
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

    it('Can update story content with right token', async () => {
        const response = await request(app)
        .put(`/story/${idStory1}`)
        .set({ token: token1 })
        .send({ content: 'abcd' });
        const story = await Story.findById(idStory1) as Story;
        assert.equal(story.content, 'abcd');
    });
});
