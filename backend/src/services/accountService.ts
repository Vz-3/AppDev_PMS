import { Role, User } from "../models/database/userSchema";
import { generateHash } from "../utilities/utils";
import { AccountModel } from "../models/accountModel";

const accountModel = new AccountModel();

export async function createUserAccount(user: User): Promise<boolean> {
    const hashPassword = await generateHash(user.password);
    user.password = hashPassword;
    return accountModel.createUser(user);
}

export async function deleteUserAccount(email: string): Promise<boolean> {
    return accountModel.deleteUser(email);
}

export async function getUserAccount(email: string): Promise<User> {
    return accountModel.getUser(email);
}

export async function updateUserAccount(oldUser: User, newUser: User): Promise<boolean> {
    return accountModel.updateUser(oldUser, newUser);
}