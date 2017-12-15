import { compare, hash } from 'bcrypt';
import { model, Schema } from 'mongoose';
import { createToken } from '../helpers/jwt';

const userSchema = new Schema({
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    name: { type: String, trim: true, required: true }
});

const UserMongo = model('User', userSchema);

export class User extends UserMongo {
    password: string;
    email: string;
    _id: string;
    name: string;
    // { success: true, response: { token, user: {} } }
    static async signIn(email: string, password: string) {
        const user = await User.findOne({ email }) as User;
        if (!user) throw new Error('User khong ton tai.');
        const same = await compare(password, user.password);
        if (!same) throw new Error('Sai password.');
        const userInfo = user.toObject() as { password: string };
        delete userInfo.password;
        const token = await createToken({ _id: user._id });
        return { user: userInfo, token };
    }

    static async signUp(email: string, password: string, name: string) {
        const encrypted = await hash(password, 8);
        const user = new User({ email, name, password: encrypted });
        await user.save();
        const userInfo = user.toObject() as { password: string };
        delete userInfo.password;
        return userInfo;
    }
}
