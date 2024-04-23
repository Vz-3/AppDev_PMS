import { db } from './database/mongodbConfig';
import { User, Role } from './database/userSchema';
import { getLocalDate } from '../utilities/utils';
import jwt from 'jsonwebtoken';

export class AccountModel {
    async createUser(user: User): Promise<boolean> {
        user.role = user.role || Role.TENANT;
        user.loggedAt = await getLocalDate();
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
            await db.UserModel.deleteOne({ email: email });
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
        const authToken = jwt.sign({ email: user.email, _id: user._id, loggedAt: datetime}, secretKey, {expiresIn: secondsTTL});
        if (!authToken) {
            console.log("User: ", user, " | Date: ", datetime);
            throw new Error('JWT Signing error!');
        }
        return authToken;
    }

    async invalidateAuth(_id: string): Promise<Date> {
        const newLogs = await getLocalDate();
        try {
            await db.UserModel.findByIdAndUpdate(_id, { loggedAt: newLogs });
        } catch (error) {
            throw new Error(`Updating loggedAt with value: ${newLogs} on user:${_id} failed!`);
        }
        return newLogs;
    }
}