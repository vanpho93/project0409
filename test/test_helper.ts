import * as assert from 'assert';
import * as request from 'supertest';
import { app } from '../src/app';
import { Story } from '../src/models/Story';
import { User } from '../src/models/User';
import '../src/startDatabase';

beforeEach('Remove all data before each test case', async () => {
    await User.remove({});
    await Story.remove({});
});
