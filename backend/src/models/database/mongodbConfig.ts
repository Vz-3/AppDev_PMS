import mongoose from "mongoose";

const connectionString: string = process.env.MONGODB_CONNECTION_STRING || '';
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

export const db = {
    initDatabaseConnection,
    dropDatabase
}