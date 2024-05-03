import { db } from './database/mongodbConfig';
import { User, Role } from './database/userSchema';
import { getLocalDate } from '../utilities/utils';
import jwt from 'jsonwebtoken';

export class AccountModel {
    async createUser(user: User): Promise<boolean> {

        // Works fine without this email validation but it's a good practice to have it.
        const userExists = await db.UserModel.findOne({ email: user.email});
        if (userExists) {
            console.log("createUser error: User already exists");
            return false;
        }
        
        user.loggedAt = await getLocalDate();
        user.role = user.role || Role.TENANT;
        const user_data = new db.UserModel(user);
        try {
            console.log("User: ", user, " | Role: ", user.role);
            await user_data.save();
            return true;
        } catch (error) {
            console.log("createUser error: ", error);
            return false;
        }
    }

    async deleteUser(email: string): Promise<boolean> {
        try {
            const foundAccount = await db.UserModel.findOne({ email: email });
            if (!foundAccount) {
                console.log("deleteUser error: User not found");
                return false;
            }
            const accountedDeleted = await db.UserModel.deleteOne({ email: email });
            if (!accountedDeleted) {
                console.log("deleteUser error: User not deleted");
                return false;
            }
            return true;
        } catch (error) {
            console.log("deleteUser error: ", error);
            return false;
        }
    }
    
    async getUser(email: string): Promise<User> {
        const userAccount = await db.UserModel.findOne({ email: email });
        if (!userAccount) {
            console.log("getUser error: User not found");
            throw new Error("User not found");
        }
        return userAccount;
    }

    async updateUser(oldUser: User, newUser: User): Promise<boolean> {
        try {
            await db.UserModel.updateOne({_id: oldUser._id}, newUser);
            return true;
        } catch (error) {
            console.log("updateUser error: ", error);
            return false;
        }
    }

    generateAuth(user: User, datetime:Date): string{
        const dt = datetime.toISOString();
        const secretKey = `${process.env.SECRET_KEY}:${dt}`;
        const secondsTTL = process.env.PREFERRED_TTL;
        const authToken = jwt.sign({ email: user.email, _id: user._id, loggedAt: dt}, secretKey, {expiresIn: secondsTTL});
        // console.log(`${secretKey} | ${secondsTTL} | ${dt}`);
        if (!authToken) {
            console.log("User: ", user, " | Date: ", datetime);
            throw new Error('JWT Signing error!');
        }
        return authToken;
    }

    async invalidateAuth(_id: string): Promise<Date> {
        const newLogs = await getLocalDate();
        try {
            // console.log(`Updating loggedAt with value: ${newLogs} on user:${_id}`);
            await db.UserModel.findByIdAndUpdate(_id, { loggedAt: newLogs });
        } catch (error) {
            throw new Error(`Updating loggedAt with value: ${newLogs} on user:${_id} failed!`);
        }
        return newLogs;
    }
}