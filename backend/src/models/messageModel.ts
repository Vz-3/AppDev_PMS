import { db } from './database/mongodbConfig';
import { Message, MessageType } from './database/messageSchema';
import { getLocalDate } from '../utilities/utils';

export class MessageModel {
    // Get
    async viewHiddenMessages(receiver: string): Promise<Message[]> {
        const message = await db.MessageModel.find({ receiver: receiver, isHidden: true });
        if (!message) {
            console.log("viewHiddenMessages error: Hidden messages not found");
            return [];
        }
        return message;
    }

    // for filtering by sender. Should mostly be for owners. 
    async getSenderMessages(receiver: string, sender: string, isAscOrder: boolean): Promise<Message[]> {
        const order = isAscOrder ? 1 : -1;
        const message = await db.MessageModel.find({ receiver: receiver, sender: sender, isHidden: false }).sort({ messageTime: order});
        if (!message) {
            console.log("getSenderMessages error: Messages not found");
            return [];
        }
        return message;
    }

    async getComplaintMessages(receiver: string, isComplete: boolean, isAscOrder: boolean): Promise<Message[]> {
        const order = isAscOrder ? 1 : -1;
        const message = await db.MessageModel.find({ receiver: receiver, messageType: MessageType.CO,  isComplete: isComplete, isHidden: false }).sort({ messageTime: order}); // hidden messages can be counted as deleted?
        if (!message) {
            console.log("getComplaints error: Complaints not found");
            return []; // Maybe no complaints found for the user
        }
        return message;
    }

    async getMaintenanceRequestMessages(receiver: string, isComplete: boolean, isAscOrder: boolean): Promise<Message[]> {
        const order = isAscOrder ? 1 : -1;
        const message = await db.MessageModel.find({ receiver: receiver, messageType: MessageType.MR, isComplete: isComplete, isHidden: false }).sort({ messageTime: order});
        if (!message) {
            console.log("getMaintenanceRequest error: Maintenance requests not found");
            return []; // Maybe no maintenance requests found for the user
        }
        return message;
    }

    async getDirectMessages(receiver: string, isAscOrder: boolean): Promise<Message[]> {
        const order = isAscOrder ? 1 : -1;
        const message = await db.MessageModel.find({ receiver: receiver, messageType: MessageType.DM, isHidden: false }).sort({ messageTime: order});
        if (!message) {
            console.log("getDirectMessage error: Direct messages not found");
            return []; // Maybe no direct messages found for the user
        }
        return message;
    }

    // Works differently from the other message types since the receiver is the buildingId, which in turn includes all units and their respective tenants.
    async getAnnouncementMessages(receiver: string, isAscOrder: boolean): Promise<Message[]> {
        const order = isAscOrder ? 1 : -1;
        const message = await db.MessageModel.find({ receiver: receiver, messageType: MessageType.AN, isHidden: false }).sort({ messageTime: order});
        if (!message) {
            console.log("getAnnouncementMessage error: Announcements not found");
            return []; // Maybe no announcements found for the bldg
        }
        return message;
    }

    async getPinnedAnnouncementMessages(receiver: string, isAscOrder: boolean): Promise<Message[]> {
        const order = isAscOrder ? 1 : -1;
        const message = await db.MessageModel.find({ receiver: receiver, messageType: MessageType.AN, isPinned: true, isHidden: false }).sort({ messageTime: order});
        if (!message) {
            console.log("getPinnedAnnouncementMessage error: Pinned announcements not found");
            return []; // Maybe no pinned announcements found for the user
        }
        return message;
    }

    
    // Create
    async createDirectMessage(message: Message): Promise<boolean> {
        message.messageType = MessageType.DM;
        message.messageTime = await getLocalDate();
        message.isHidden = false;
        const message_data = new db.MessageModel(message);
        try {
            await message_data.save();
            return true;
        } catch (error) {
            console.log("createDirectMessage error: ", error);
            return false;
        }
    }

    async createMaintenanceRequestMessage(message: Message): Promise<boolean> {
        message.messageType = MessageType.MR;
        message.messageTime = await getLocalDate();
        message.isComplete = false;
        message.isHidden = false;
        const message_data = new db.MessageModel(message);
        try {
            await message_data.save();
            return true;
        } catch (error) {
            console.log("createMaintenanceRequestMessage error: ", error);
            return false;
        }
    }

    async createComplaintMessage(message: Message): Promise<boolean> {
        message.messageType = MessageType.CO;
        message.messageTime = await getLocalDate();
        message.isComplete = false;
        message.isHidden = false;
        const message_data = new db.MessageModel(message);
        try {
            await message_data.save();
            return true;
        } catch (error) {
            console.log("createComplaintMessage error: ", error);
            return false;
        }
    }

    async createAnnouncementMessage(message: Message): Promise<boolean> {
        message.messageType = MessageType.AN;
        message.messageTime = await getLocalDate();
        message.isHidden = false;
        const message_data = new db.MessageModel(message);
        try {
            await message_data.save();
            return true;
        } catch (error) {
            console.log("createAnnouncementMessage error: ", error);
            return false;
        }
    }

    // Delete 
    async deleteMessage(messageId: string): Promise<boolean> {
        try {
            const foundMessage = await db.MessageModel.findOne({ _id: messageId });
            if (!foundMessage) {
                console.log("deleteMessage error: Message not found");
                return false;
            }
            const messageDeleted = await db.MessageModel.deleteOne({ _id: messageId });
            if (!messageDeleted) {
                console.log("deleteMessage error: Message not deleted");
                return false;
            }
            return true;
        } catch (error) {
            console.log("deleteMessage error: ", error);
            return false;
        }
    }

    async deleteAllMessages(sender: string): Promise<boolean> {
        try {
            const foundMessages = await db.MessageModel.find({ sender: sender });
            if (!foundMessages) {
                console.log("deleteAllMessages error: Messages not found");
                return false;
            }
            const messagesDeleted = await db.MessageModel.deleteMany({ sender: sender });
            if (!messagesDeleted) {
                console.log("deleteAllMessages error: Messages not deleted");
                return false;
            }
            return true;
        } catch (error) {
            console.log("deleteAllMessages error: ", error);
            return false;
        }
    }

    // Update 
    async resolveMessage(messageId: string): Promise<boolean> {
        try {
            const foundMessage = await db.MessageModel.findOne({ _id: messageId });
            if (!foundMessage) {
                console.log("resolveMessage error: Message not found");
                return false;
            }
            await db.MessageModel.updateOne({ _id: messageId }, { isComplete: true });
            return true;
        } catch (error) {
            console.log("resolveMessage error: ", error);
            return false;
        }
    }

    async hideMessage(messageId: string): Promise<boolean> {
        try {
            const foundMessage = await db.MessageModel.findOne({ _id: messageId });
            if (!foundMessage) {
                console.log("hideMessage error: Message not found");
                return false;
            }
            await db.MessageModel.updateOne({ _id: messageId }, { isHidden: true });
            return true;
        } catch (error) {
            console.log("hideMessage error: ", error);
            return false;
        }
    }

    async hideAllMessages(receiver: string): Promise<boolean> {
        try {
            const foundMessages = await db.MessageModel.find({ receiver: receiver, isHidden: false});
            if (!foundMessages) {
                console.log("hideAllMessages error: Messages not found");
                return false;
            }
            await db.MessageModel.updateMany({ receiver: receiver }, { isHidden: true });
            return true;
        } catch (error) {
            console.log("hideAllMessages error: ", error);
            return false;
        }
    }

    async unpinAnnouncementMessage(messageId: string): Promise<boolean> {
        try {
            const foundMessage = await db.MessageModel.findOne({ _id: messageId, messageType: MessageType.AN});
            if (!foundMessage) {
                console.log("unpinAnnouncementMessage error: Message not found");
                return false;
            }
            await db.MessageModel.updateOne({ _id: messageId }, { isPinned: false });
            return true;
        } catch (error) {
            console.log("unpinAnnouncementMessage error: ", error);
            return false;
        }
    }

    async pinAnnouncementMessage(messageId: string): Promise<boolean> {
        try {
            const foundMessage = await db.MessageModel.findOne({ _id: messageId, messageType: MessageType.AN});
            if (!foundMessage) {
                console.log("pinAnnouncementMessage error: Message not found");
                return false;
            }
            await db.MessageModel.updateOne({ _id: messageId }, { isPinned: true });
            return true;
        } catch (error) {
            console.log("pinAnnouncementMessage error: ", error);
            return false;
        }
    }
}