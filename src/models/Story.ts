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
    fans: User[];
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
        if (!removedStory) throw new Error('Cannot find story');
        await User.findByIdAndUpdate(idUser, { $pull: { stories: idStory } });
        return removedStory;
    }

    static async updateStoryContent(idUser: string, idStory: string, content: string) {
        const updatedStory = await Story.findOneAndUpdate({
            _id: idStory,
            author: idUser
        }, { content }, { new: true });
        if (!updatedStory) throw new Error('Cannot find story');
        return updatedStory;
    }

    static async likeStory(idUser: string, idStory: string) {
        const story = await Story.findByIdAndUpdate(idStory, { $addToSet: { fans: idUser } }, { new: true });
        if (!story) throw new Error('Cannot find story');
        return story;
    }

    static async dislikeStory(idUser: string, idStory: string) {
        const story = await Story.findByIdAndUpdate(idStory, { $pull: { fans: idUser } }, { new: true });
        if (!story) throw new Error('Cannot find story');
        return story;
    }
}
