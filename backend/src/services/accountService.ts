import { User } from "../models/database/userSchema";
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

export async function getUserAccountById(id: string): Promise<User> {
    return accountModel.getUserById(id);
}

export async function updateUserAccount(oldUser: User, newUser: User): Promise<boolean> {
    return accountModel.updateUser(oldUser, newUser);
}

export async function updateUserPassword(user: User, password: string): Promise<boolean> {
    const hashPassword = await generateHash(password);
    user.password = hashPassword;
    return accountModel.updateUser(user, user);
}

export async function validateUserPassword(user: User, password: string): Promise<boolean>{
    const hashPassword = await generateHash(password);
    return user.password === hashPassword;
}

export async function loginUser(user: User, dt: Date): Promise<string> {
    const authToken = accountModel.generateAuth(user, dt);
    return authToken;
}

export async function logoutUser(_id: string): Promise<Date>{
    return await accountModel.invalidateAuth(_id);
}

export async function getUserAccounts(): Promise<User[]> {
    return accountModel.getTenants();
}