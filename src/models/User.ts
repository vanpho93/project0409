import { model, Schema } from 'mongoose';

const userSchema = new Schema({
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    name: { type: String, trim: true, required: true }
});

const UserMongo = model('User', userSchema);

export class User extends UserMongo {}
