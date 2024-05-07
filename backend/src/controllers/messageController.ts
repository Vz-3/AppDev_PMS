import { Request, Response } from "express";
import { RequestWithAuth } from "../types";
import { Message, MessageType } from "../models/database/messageSchema";
import { createAN, createCO, createDM, createMR, getAN, getCO, getDM, getFilteredSenderMessages, getHiddenMessages, getMR, getPinnedAN, removeMessage, clearMessages, unpin, pin, hideAll, resolve } from "../services/messageService";
import { getUserAccountById } from "../services/accountService";
import { getPropertyById, getTenantUnit } from "../services/propertyService";

// create
export async function dmWriteAPI(req: RequestWithAuth, res: Response) {
    try {
        const sender = req._id;
        const { receiver, messageTitle, message} = req.body;
        if (!sender || !receiver || !messageTitle || !message) {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }

        const senderUser = await getUserAccountById(sender);
        const receiverUser = await getUserAccountById(receiver);
        if (!senderUser || !receiverUser) {
            res.status(400).send({ 
                success: false,
                message: "Invalid sender or receiver ID." 
            });
            return;
        }

        const newMessage: Message = {
            messageType: MessageType.DM,
            sender,
            receiver,
            messageTitle,
            message,
            messageTime: new Date()
        }

        const isCreated = await createDM(newMessage);
        if (!isCreated) {
            res.status(400).send({ 
                success: false,
                message: "Failed to create direct message." 
            });
            return;
        }

        res.status(200).send({
            success: true,
            message: 'Direct message sent!'
        });

    } catch (error) {
        console.log("Direct Message error: ", error);
        res.status(400).send({
            success: false,
            message: "Direct Message API error.",
            error
        });
        return;
    }
}

export async function mrWriteAPI(req: RequestWithAuth, res: Response) {
    try {
        const sender = req._id;
        const { messageTitle, message} = req.body; //techinically receiver should always be the bldg owner. 
        if (!sender || !messageTitle || !message) {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }

        const senderUser = await getUserAccountById(sender);
        if (!senderUser) {
            res.status(400).send({ 
                success: false,
                message: "Invalid sender or receiver ID." 
            });
            return;
        }

        const senderUnit = await getTenantUnit(senderUser);
        if (!senderUnit) {
            res.status(400).send({ 
                success: false,
                message: "Tenant does not have a unit." 
            });
            return;
        }

        const senderBldg = await getPropertyById(senderUnit.buildingId);
        if (!senderBldg) {
            res.status(400).send({ 
                success: false,
                message: "Tenant's building not found." 
            });
            return;
        }

        const receiver = senderBldg.buildingOwner;

        if (senderUser.role !== 'tenant') {
            res.status(400).send({ 
                success: false,
                message: "Only tenants can create maintenance requests." 
            });
            return;
        }

        const newMessage: Message = {
            messageType: MessageType.MR,
            sender,
            receiver,
            messageTitle,
            message,
            messageTime: new Date()
        }

        const isCreated = await createMR(newMessage);
        if (!isCreated) {
            res.status(400).send({ 
                success: false,
                message: "Failed to create maintenance request." 
            });
            return;
        }

        res.status(200).send({
            success: true,
            message: 'Maintenance request sent!'
        });

    } catch (error) {
        console.log("Maintenance Request error: ", error);
        res.status(400).send({
            success: false,
            message: "Maintenance Request API error.",
            error
        });
        return;
    }
}

export async function coWriteAPI(req: RequestWithAuth, res: Response) {
    try {
        const sender = req._id;
        const { receiver, messageTitle, message} = req.body;
        if (!sender || !receiver || !messageTitle || !message) {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }

        const senderUser = await getUserAccountById(sender);
        const receiverUser = await getUserAccountById(receiver);
        if (!senderUser || !receiverUser) {
            res.status(400).send({ 
                success: false,
                message: "Invalid sender or receiver ID." 
            });
            return;
        }


        const newMessage: Message = {
            messageType: MessageType.CO,
            sender,
            receiver,
            messageTitle,
            message,
            messageTime: new Date()
        }

        const isCreated = await createCO(newMessage);
        if (!isCreated) {
            res.status(400).send({ 
                success: false,
                message: "Failed to create complaint." 
            });
            return;
        }

        res.status(200).send({
            success: true,
            message: 'Complaint sent!'
        });

    } catch (error) {
        console.log("Complaint error: ", error);
        res.status(400).send({
            success: false,
            message: "Complaint API error.",
            error
        });
        return;
    }
}

export async function anWriteAPI(req: RequestWithAuth, res: Response) {
    try {
        const sender = req._id;
        const { receiver, messageTitle, message} = req.body;
        if (!sender || !receiver || !messageTitle || !message) {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }

        const senderUser = await getUserAccountById(sender);
        if (!senderUser) {
            res.status(400).send({ 
                success: false,
                message: "Invalid sender ID." 
            });
            return;
        }

        if (senderUser.role !== 'owner') {
            res.status(400).send({ 
                success: false,
                message: "Only owners can create announcements." 
            });
            return;
        }

        const newMessage: Message = {
            messageType: MessageType.AN,
            sender,
            receiver,
            messageTitle,
            message,
            messageTime: new Date()
        }

        const isCreated = await createAN(newMessage);
        if (!isCreated) {
            res.status(400).send({ 
                success: false,
                message: "Failed to create announcement." 
            });
            return;
        }

        res.status(200).send({
            success: true,
            message: 'Announcement sent!'
        });

    } catch (error) {
        console.log("Announcement error: ", error);
        res.status(400).send({
            success: false,
            message: "Announcement API error.",
            error
        });
        return;
    }
}

// read requires auth

export async function dmFetchAPI(req: RequestWithAuth, res: Response) {
    try {
        const receiver = req._id;
        const { isAscOrder } = req.body;
        if (!receiver || isAscOrder === undefined) {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }

        const messages = await getDM(receiver, isAscOrder);
        if (!messages) {
            res.status(400).send({ 
                success: false,
                message: "Failed to fetch direct messages." 
            });
            return;
        }

        res.status(200).send({
            success: true,
            messages
        });

    } catch (error) {
        console.log("Direct Message Fetch error: ", error);
        res.status(400).send({
            success: false,
            message: "Direct Message Fetch API error.",
            error
        });
        return;
    }
}

export async function mrFetchAPI(req: RequestWithAuth, res: Response) {
    try {
        const receiver = req._id;
        const { isComplete, isAscOrder } = req.body;
        if (!receiver || isComplete === undefined || isAscOrder === undefined) {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }

        const messages = await getMR(receiver, isComplete, isAscOrder);
        if (!messages) {
            res.status(400).send({ 
                success: false,
                message: "Failed to fetch maintenance request messages." 
            });
            return;
        }

        res.status(200).send({
            success: true,
            messages
        });

    } catch (error) {
        console.log("Maintenance Request Fetch error: ", error);
        res.status(400).send({
            success: false,
            message: "Maintenance Request Fetch API error.",
            error
        });
        return;
    }
}

export async function coFetchAPI(req: RequestWithAuth, res: Response) {
    try {
        const receiver = req._id;
        const { isComplete, isAscOrder } = req.body;
        if (!receiver || isComplete === undefined || isAscOrder === undefined) {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }

        const messages = await getCO(receiver, isComplete, isAscOrder);
        if (!messages) {
            res.status(400).send({ 
                success: false,
                message: "Failed to fetch complaint messages." 
            });
            return;
        }

        res.status(200).send({
            success: true,
            messages
        });

    } catch (error) {
        console.log("Complaint Fetch error: ", error);
        res.status(400).send({
            success: false,
            message: "Complaint Fetch API error.",
            error
        });
        return;
    }
}

export async function anFetchAPI(req: RequestWithAuth, res: Response) {
    try {
        // receiver should be buildingName
        const receiver = req._id;
        const { isAscOrder } = req.body;
        if (!receiver || isAscOrder === undefined) {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }

        const receiverUser = await getUserAccountById(receiver);
        if (!receiverUser) {
            res.status(400).send({ 
                success: false,
                message: "Invalid receiver ID." 
            });
            return;
        }

        const receiverUnit = await getTenantUnit(receiverUser);
        if (!receiverUnit) {
            res.status(400).send({ 
                success: false,
                message: "Receiver does not have a unit." 
            });
            return;
        }

        const receiverBldg = await getPropertyById(receiverUnit.buildingId);
        if (!receiverBldg) {
            res.status(400).send({ 
                success: false,
                message: "Receiver's building not found." 
            });
            return;
        }

        const receiverBldgName = receiverBldg.buildingName;

        const messages = await getAN(receiverBldgName, isAscOrder);
        if (!messages) {
            res.status(400).send({ 
                success: false,
                message: "Failed to fetch announcement messages." 
            });
            return;
        }

        res.status(200).send({
            success: true,
            messages
        });

    } catch (error) {
        console.log("Announcement Fetch error: ", error);
        res.status(400).send({
            success: false,
            message: "Announcement Fetch API error.",
            error
        });
        return;
    }
}

export async function hiddenMsgFetchAPI(req: RequestWithAuth, res: Response) {
    try {
        const receiver = req._id;
        if (!receiver) {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }

        const messages = await getHiddenMessages(receiver);
        if (!messages) {
            res.status(400).send({ 
                success: false,
                message: "Failed to fetch hidden messages." 
            });
            return;
        }

        res.status(200).send({
            success: true,
            messages
        });

    } catch (error) {
        console.log("Hidden Message Fetch error: ", error);
        res.status(400).send({
            success: false,
            message: "Hidden Message Fetch API error.",
            error
        });
        return;
    }
}

export async function pinnedAnFetchAPI(req: RequestWithAuth, res: Response) {
    try {
        // receiver should be buildingName
        const receiver = req._id;
        const { isAscOrder } = req.body;
        if (!receiver || isAscOrder === undefined) {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }

        const receiverUser = await getUserAccountById(receiver);
        if (!receiverUser) {
            res.status(400).send({ 
                success: false,
                message: "Invalid receiver ID." 
            });
            return;
        }

        const receiverUnit = await getTenantUnit(receiverUser);
        if (!receiverUnit) {
            res.status(400).send({ 
                success: false,
                message: "Receiver does not have a unit." 
            });
            return;
        }

        const receiverBldg = await getPropertyById(receiverUnit.buildingId);
        if (!receiverBldg) {
            res.status(400).send({ 
                success: false,
                message: "Receiver's building not found." 
            });
            return;
        }

        const receiverBldgName = receiverBldg.buildingName;
        const messages = await getPinnedAN(receiverBldgName, isAscOrder);
        if (!messages) {
            res.status(400).send({ 
                success: false,
                message: "Failed to fetch pinned announcement messages." 
            });
            return;
        }

        res.status(200).send({
            success: true,
            messages
        });

    } catch (error) {
        console.log("Pinned Announcement Fetch error: ", error);
        res.status(400).send({
            success: false,
            message: "Pinned Announcement Fetch API error.",
            error
        });
        return;
    }
}

export async function filteredMsgFetchAPI(req: RequestWithAuth, res: Response) {
    try {
        const receiver = req._id;
        const { sender, isAscOrder } = req.body; //sender's ID
        if (!sender || isAscOrder === undefined) {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }

        const messages = await getFilteredSenderMessages(receiver, sender, isAscOrder);
        if (!messages) {
            res.status(400).send({ 
                success: false,
                message: "Failed to fetch filtered sender messages." 
            });
            return;
        }

        res.status(200).send({
            success: true,
            messages
        });

    } catch (error) {
        console.log("Filtered Message Fetch error: ", error);
        res.status(400).send({
            success: false,
            message: "Filtered Message Fetch API error.",
            error
        });
        return;
    }
}

// delete 
export async function removedMsgAPI(req: RequestWithAuth, res: Response) {
    try {
        const { messageId }= req.query; //APIroute?messageId=123 for example
        if (!messageId || typeof messageId !== 'string') {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }

        const isDeleted = await removeMessage(messageId);
        if (!isDeleted) {
            res.status(400).send({ 
                success: false,
                message: "Failed to remove message." 
            });
            return;
        }

        res.status(200).send({
            success: true,
            message: 'Message removed!'
        });

    } catch (error) {
        console.log("Remove Message error: ", error);
        res.status(400).send({
            success: false,
            message: "Remove Message API error.",
            error
        });
        return;
    }
}

export async function clearMsgAPI(req: RequestWithAuth, res: Response) {
    try {
        const sender = req._id;
        if (!sender) {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }

        const isCleared = await clearMessages(sender);
        if (!isCleared) {
            res.status(400).send({ 
                success: false,
                message: "Failed to clear messages." 
            });
            return;
        }

        res.status(200).send({
            success: true,
            message: 'Messages cleared!'
        });

    } catch (error) {
        console.log("Clear Messages error: ", error);
        res.status(400).send({
            success: false,
            message: "Clear Messages API error.",
            error
        });
        return;
    }
}

// update
export async function resolveMessageAPI(req: Request, res: Response) {
    try {
        const { messageId }= req.query; //APIroute?messageId=123 for example
        if (!messageId || typeof messageId !== 'string') {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }

        const message = await resolve(messageId);
        if (!message) {
            res.status(400).send({ 
                success: false,
                message: "Failed to resolve message." 
            });
            return;
        }

        res.status(200).send({
            success: true,
            message: 'Message resolved!'
        });

    } catch (error) {
        console.log("Resolve Message error: ", error);
        res.status(400).send({
            success: false,
            message: "Resolve Message API error.",
            error
        });
        return;
    }
}

export async function hideMessageAPI(req: Request, res: Response) {
    try {
        const { messageId }= req.query; //APIroute?messageId=123 for example
        if (!messageId || typeof messageId !== 'string') {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }

        const message = await removeMessage(messageId);
        if (!message) {
            res.status(400).send({ 
                success: false,
                message: "Failed to hide message." 
            });
            return;
        }

        res.status(200).send({
            success: true,
            message: 'Message hidden!'
        });

    } catch (error) {
        console.log("Hide Message error: ", error);
        res.status(400).send({
            success: false,
            message: "Hide Message API error.",
            error
        });
        return;
    }
}

export async function hideAllMessagesAPI(req: RequestWithAuth, res: Response) {
    try {
        const sender = req._id;
        if (!sender) {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }

        const isHidden = await hideAll(sender);
        if (!isHidden) {
            res.status(400).send({ 
                success: false,
                message: "Failed to hide messages." 
            });
            return;
        }

        res.status(200).send({
            success: true,
            message: 'Messages hidden!'
        });

    } catch (error) {
        console.log("Hide Messages error: ", error);
        res.status(400).send({
            success: false,
            message: "Hide Messages API error.",
            error
        });
        return;
    }
}

export async function pinAnnouncementAPI(req: RequestWithAuth, res: Response) {
    try {
        const { messageId }= req.query; //APIroute?messageId=123 for example
        if (!messageId || typeof messageId !== 'string') {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }
        const user = await getUserAccountById(req._id);
        if (!user) {
            res.status(400).send({ 
                success: false,
                message: "Invalid user ID." 
            });
            return;
        }

        if (user.role !== 'owner') {
            res.status(400).send({ 
                success: false,
                message: "Only owners can pin announcements." 
            });
            return;
        }

        const message = await pin(messageId);
        if (!message) {
            res.status(400).send({ 
                success: false,
                message: "Failed to pin announcement." 
            });
            return;
        }

        res.status(200).send({
            success: true,
            message: 'Announcement pinned!'
        });

    } catch (error) {
        console.log("Pin Announcement error: ", error);
        res.status(400).send({
            success: false,
            message: "Pin Announcement API error.",
            error
        });
        return;
    }
}

export async function unpinAnnouncementAPI(req: RequestWithAuth, res: Response) {
    try {
        const { messageId }= req.query; //APIroute?messageId=123 for example
        if (!messageId || typeof messageId !== 'string') {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }


        const message = await unpin(messageId);
        if (!message) {
            res.status(400).send({ 
                success: false,
                message: "Failed to unpin announcement." 
            });
            return;
        }

        res.status(200).send({
            success: true,
            message: 'Announcement unpinned!'
        });

    } catch (error) {
        console.log("Unpin Announcement error: ", error);
        res.status(400).send({
            success: false,
            message: "Unpin Announcement API error.",
            error
        });
        return;
    }
}