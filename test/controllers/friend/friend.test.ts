import * as assert from 'assert';
import * as request from 'supertest';
import { app } from '../../../src/app';
import { Story } from '../../../src/models/Story';
import { User } from '../../../src/models/User';
import { UserService } from '../../../src/models/UserService';

describe.only('Test POST /friend', () => {
    let token1;
    let token2;
    let idUser1;
    let idUser2;
    beforeEach('Sign up, sign in to get token for test', async () => {
        await User.signUp('pho@gmail.com', '123', 'Pho 1');
        await User.signUp('ohp@gmail.com', '123', 'Pho 2');
        await User.signUp('hop@gmail.com', '123', 'Pho 3');
        const response1 = await User.signIn('pho@gmail.com', '123');
        token1 = response1.token;
        idUser1 = response1.user._id;
        const response2 = await User.signIn('ohp@gmail.com', '123');
        token2 = response2.token;
        idUser2 = response2.user._id;
    });

    it ('Can send request with token', async () => {
        const response = await request(app)
        .post('/friend/sendRequest')
        .set({ token: token1 })
        .send({ idReceiver: idUser2 });
        const user1 = await User.findById(idUser1).populate('sentRequests') as User;
        assert.equal(user1.sentRequests[0].name, 'Pho 2');
        const user2 = await User.findById(idUser2).populate('imcomingRequests') as User;
        assert.equal(user2.imcomingRequests[0].name, 'Pho 1');
    });

    it ('Can accept friend request', async () => {
        await UserService.sendFriendRequest(idUser1, idUser2);
        await request(app)
        .post('/friend/acceptRequest')
        .set({ token: token2 })
        .send({ idSender: idUser1 });
        const user1 = await User.findById(idUser1)
        .populate('friends')
        .populate('sentRequests') as User;
        assert.equal(user1.friends[0].name, 'Pho 2');
        assert.equal(user1.sentRequests.length, 0);
        const user2 = await User.findById(idUser2).populate('friends') as User;
        assert.equal(user2.friends[0].name, 'Pho 1');
    });

    it ('Can remove friend request', async () => {
        await UserService.sendFriendRequest(idUser1, idUser2);
        await request(app)
        .post('/friend/removeRequest')
        .set({ token: token1 })
        .send({ idReceiver: idUser2 });
        const user1 = await User.findById(idUser1).populate('sentRequests') as User;
        assert.equal(user1.sentRequests.length, 0);
        const user2 = await User.findById(idUser2).populate('imcomingRequests') as User;
        assert.equal(user2.imcomingRequests.length, 0);
    });

    it ('Can decline friend request', async () => {
        await UserService.sendFriendRequest(idUser1, idUser2);
        await request(app)
        .post('/friend/declineRequest')
        .set({ token: token2 })
        .send({ idSender: idUser1 });
        const user1 = await User.findById(idUser1).populate('sentRequests') as User;
        assert.equal(user1.sentRequests.length, 0);
        const user2 = await User.findById(idUser2).populate('imcomingRequests') as User;
        assert.equal(user2.imcomingRequests.length, 0);
    });
});
