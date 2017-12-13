import * as assert from 'assert';
import * as request from 'supertest';
import { app } from '../src/app';
import { User } from '../src/models/User';
import '../src/startDatabase';

beforeEach('Remove all data before each test case', async () => {
    await User.remove({});
});