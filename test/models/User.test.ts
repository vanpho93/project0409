import * as assert from 'assert';
import { User } from '../../src/models/User';

describe('Test user', () => {
    it ('Can create new user', async () => {
        const user = new User({ email: 'pho@gmail.com', password: '123', name: 'phoooo' });
        await user.save();
        const numOfUsers = await User.count({});
        assert.equal(numOfUsers, 1);
    });
});
