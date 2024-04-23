import { db } from './database/mongodbConfig';
import { User, Role } from './database/userSchema';

export class AccountModel {
    async createUser(user: User): Promise<boolean> {
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
}