import { User } from './User';

export class UserService {
    static async sendFriendRequest(idSender: string, idReceiver: string) {
        await User.findByIdAndUpdate(idSender, { $addToSet: { sentRequests: idReceiver } });
        await User.findByIdAndUpdate(idReceiver, { $addToSet: { imcomingRequests: idSender } });
    }

    static async acceptFriendRequest(idUser: string, idRequestSender: string) {
        await User.findByIdAndUpdate(idUser, { $addToSet: { friends: idRequestSender } });
        await User.findByIdAndUpdate(idRequestSender, { $addToSet: { friends: idUser } });
        await User.findByIdAndUpdate(idUser, { $pull: { imcomingRequests: idRequestSender } });
        await User.findByIdAndUpdate(idRequestSender, { $pull: { sentRequests: idUser } });
    }

    static async removeFriendRequest(idSender: string, idReceiver: string) {
        await User.findByIdAndUpdate(idSender, { $pull: { sentRequests: idReceiver } });
        await User.findByIdAndUpdate(idReceiver, { $pull: { imcomingRequests: idSender } });
    }
}
