import { compare, hash } from 'bcrypt';
import { model, Schema } from 'mongoose';
import { User } from './User';

const storySchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    fans: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    content: { type: String, trim: true, required: true }
});

const StoryMongo = model('Story', storySchema);

export class Story extends StoryMongo {
    content: string;
    author: User;
    static async addStory(idUser: string, content: string) {
        const story = new Story({ author: idUser, content });
        await story.save();
        await User.findByIdAndUpdate(idUser, { $push: { stories: story._id } });
        return story;
    }

    static async removeStory(idUser: string, idStory: string) {
        const removedStory = await Story.findOneAndRemove({
            _id: idStory,
            author: idUser
        });
        await User.findByIdAndUpdate(idUser, { $pull: { stories: idStory } });
        return removedStory;
    }
}
