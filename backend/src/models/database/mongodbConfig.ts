import mongoose from "mongoose";
import { User, userSchema } from "./userSchema";
import { Building, buildingSchema, unitSchema, Unit } from "./propertySchema";
import { Message, messageSchema } from "./messageSchema";

const connectionString: string = process.env.MONGODB_CONNECTION_STRING!;
const databaseName: string = 'pms';

const initDatabaseConnection = async () => {
    try {
        await mongoose.connect(`${connectionString}/${databaseName}`, );
        console.log('[MongoDB] connection successful');
    } catch (error) {
        console.log('[MongoDB] connection failed:', error);
    }
}

const dropDatabase = async () => {
    try {
        await mongoose.connection.dropDatabase();
        console.log(`[MongoDB] dropped [${databaseName}] database`);
        return true;
    } catch (error) {
        console.log("[MongoDB] Drop database error: ", error);
        return false;
    }
}

const UserModel = mongoose.model<User>('User', userSchema);
const BuildingModel = mongoose.model<Building>('Building', buildingSchema);
const UnitModel = mongoose.model<Unit>('Unit', unitSchema);
const MessageModel = mongoose.model<Message>('Message', messageSchema);

export const db = {
    initDatabaseConnection,
    dropDatabase,
    UserModel,
    BuildingModel,
    UnitModel,
    MessageModel
}