import * as assert from 'assert';
import { User } from '../../src/models/User';

xdescribe('Test user', () => {
    it ('Can create new user', async () => {
        const user = new User({ email: 'pho@gmail.com', password: '123', name: 'phoooo' });
        await user.save();
        const numOfUsers = await User.count({});
        assert.equal(numOfUsers, 1);
    });
});

describe('Test sign up', () => {
    it('Can sign up with full info', async () => {
        await User.signUp('vanpho1@gmail.com', '123', 'Pho');
        const user = await User.findOne({ email: 'vanpho1@gmail.com' }) as User;
        assert.equal(user.name, 'Pho');
    });

    it('Cannot sign up with dup email', async () => {
        await User.signUp('vanpho1@gmail.com', '123', 'Pho');
        try {
            await User.signUp('vanpho1@gmail.com', '1234', 'Pho 2');
        } catch (err) {
            const count = await User.count({});
            assert.equal(count, 1);
            assert.equal(err.code, 11000);
        }
    });
});

describe('Test sign in', () => {
    beforeEach('Can sign up with full info', async () => {
        await User.signUp('vanpho1@gmail.com', '123', 'Pho');
    });

    it('Can sign in with right email and password', async () => {
        const response = await User.signIn('vanpho1@gmail.com', '123');
        assert.equal(response.user.email, 'vanpho1@gmail.com');
    });

    it('Cannot sign in with wrong email', async () => {
        try {
            await User.signIn('vanpho2@gmail.com', '123');
        } catch (err) {
            assert.equal(err.message, 'User khong ton tai.');
        }
    });

    it('Cannot sign in with wrong password', async () => {
        try {
            await User.signIn('vanpho1@gmail.com', '1234');
        } catch (err) {
            assert.equal(err.message, 'Sai password.');
        }
    });
});
