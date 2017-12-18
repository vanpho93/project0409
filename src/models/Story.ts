import { compare, hash } from 'bcrypt';
import { model, Schema } from 'mongoose';

const storySchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    fans: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    content: { type: String, trim: true, required: true }
});

const StoryMongo = model('User', storySchema);

export class Story extends StoryMongo {
    content: string;
}
