import { Message } from '../models/database/messageSchema';
import { MessageModel } from '../models/messageModel';

const messageModel = new MessageModel();

//---Create---
export async function createDM(message: Message): Promise<boolean> {
    return messageModel.createDirectMessage(message);
}

export async function createMR(message: Message): Promise<boolean> {
    return messageModel.createMaintenanceRequestMessage(message);
}

export async function createCO(message: Message): Promise<boolean> {
    return messageModel.createComplaintMessage(message);
}

export async function createAN(message: Message): Promise<boolean> {
    return messageModel.createAnnouncementMessage(message);
}

//---Read---

export async function getDM(receiver: string, isAscOrder: boolean): Promise<Message[]> {
    return messageModel.getDirectMessages(receiver, isAscOrder);
}

export async function getMR(receiver: string, isComplete: boolean, isAscOrder: boolean): Promise<Message[]> {
    return messageModel.getMaintenanceRequestMessages(receiver, isComplete, isAscOrder);
}

export async function getCO(receiver: string, isComplete: boolean, isAscOrder: boolean): Promise<Message[]> {
    return messageModel.getComplaintMessages(receiver, isComplete, isAscOrder);
}

export async function getAN(bldgReceiver: string, isAscOrder: boolean): Promise<Message[]> {
    return messageModel.getAnnouncementMessages(bldgReceiver, isAscOrder);
}

export async function getHiddenMessages(receiver: string): Promise<Message[]> {
    return messageModel.viewHiddenMessages(receiver);
}

export async function getPinnedAN(receiver: string, isAscOrder: boolean): Promise<Message[]> {
    return messageModel.getPinnedAnnouncementMessages(receiver, isAscOrder);
}

export async function getFilteredSenderMessages(receiver: string, sender: string, isAscOrder: boolean): Promise<Message[]> {
    return messageModel.getSenderMessages(receiver, sender, isAscOrder);
}

//---Delete---
export async function removeMessage(messageId: string): Promise<boolean> {
    return messageModel.deleteMessage(messageId);
}

export async function clearMessages(sender: string): Promise<boolean> {
    return messageModel.deleteAllMessages(sender);
}

//---Update
export async function resolve(messageId: string): Promise<boolean> {
    return messageModel.resolveMessage(messageId);
}

export async function hide(messageId: string): Promise<boolean> {
    return messageModel.hideMessage(messageId);
}

export async function hideAll(sender: string): Promise<boolean> {
    return messageModel.hideAllMessages(sender);
}

export async function pin(messageId: string): Promise<boolean> {
    return messageModel.pinAnnouncementMessage(messageId);
}

export async function unpin(messageId: string): Promise<boolean> {
    return messageModel.unpinAnnouncementMessage(messageId);
}