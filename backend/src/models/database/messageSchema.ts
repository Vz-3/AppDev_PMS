import { BooleanSchemaDefinition, Schema, Types } from "mongoose";

export enum MessageType {
    DM = "direct message",
    MR = "maintenance request",
    AN = "announcement",
    CO = "complaint"
}

export interface Message {
    _id?: Types.ObjectId,
    messageType: MessageType,
    sender: string, // owner or tenant Id
    receiver: string, // owner Id for DM, MR, and CO, but AN is buildingName. 
    messageTitle: string,
    message: string,
    messageTime: Date,
    isPinned?: boolean, // for priority of announcements only
    isComplete?: boolean, // for maintenance requests and complaints only
    isHidden?: boolean,
}

export const messageSchema: Schema<Message> = new Schema({
    messageType: { type: String, required: true, enum: Object.values(MessageType), default: MessageType.DM},
    sender: { type: String, required: true},
    receiver: { type: String, required: true},
    messageTitle: { type: String, required: true},
    message: { type: String, required: true},
    messageTime: { type: Date, required: true},
    isPinned: { type: Boolean, default: false},
    isComplete: { type: Boolean, default: false},
    isHidden: { type: Boolean, default: false},
});