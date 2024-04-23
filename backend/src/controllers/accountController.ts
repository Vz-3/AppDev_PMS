import { Request, Response } from 'express';
import { Role, User } from '../models/database/userSchema';
import { createUserAccount, deleteUserAccount, getUserAccount, updateUserAccount, validateUserPassword, loginUser, logoutUser } from '../services/accountService';
import { RequestWithAuth } from '../types';
import { getLocalDate } from '../utilities/utils';

export async function register(req: Request, res: Response) {
    try {
        const { userName, password, name, email, contactNo, dateOfBirth, role } = req.body;
        if (!userName || !password || !name || !email || !contactNo || !dateOfBirth) {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }

        const userData: User = {
            userName,
            password,
            name,
            email,
            contactNo,
            dateOfBirth,
            role: role || Role.TENANT,
        }
        const success = await createUserAccount(userData);
        
        if (!success) {
            res.status(400).send({ 
                success: false,
                message: "Failed to create user account." 
            });
            return;
        }

        res.status(200).send({
            success: true,
            message: 'Signup is complete!'
        });

    } catch (e) {
        console.log("Register error: ", e);
        res.status(400).send({
            success: false,
            message: "Register API error."
        });
        return;
    }
};

export async function deleteAccount(req: Request, res: Response) {
    try {
        const email = (req as RequestWithAuth).email;
        const success = await deleteUserAccount(email);

        if (!success) {
            res.status(400).send({ 
                success: false,
                message: "Failed to delete user account." 
            });
            return;
        }

        res.status(200).send({
            success: true,
            message: 'Account deleted!'
        });

    } catch (e) {
        console.log("Delete Account error: ", e);
        res.status(400).send({
            success: false,
            message: "Delete Account API error."
        });
        return;
    }
};

export async function logIn(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }

        const userAccount = await getUserAccount(email);

        const isValidated = await validateUserPassword(userAccount, password);
        if (!isValidated) {
            res.status(400).send({ 
                success: false,
                message: "Invalid credentials." 
            });
            return;
        }

        const loginTime = await getLocalDate();
        const authToken = await loginUser(userAccount, loginTime);
        
        res.status(200).send({
            success: true,
            message: 'Login successful!',
            token: authToken,
            loggedAt: loginTime,
            role: userAccount.role
        });

    } catch (e) {
        console.log("Login error: ", e);
        res.status(400).send({
            success: false,
            message: "Login API error."
        });
        return;
    }
};

export async function logOut(req: RequestWithAuth, res: Response) {
    try {
        const logoutTime = await logoutUser(req._id);
        
        res.status(200).send({
            success: true,
            message: 'Logout successful!',
            loggedAt: logoutTime
        });
        return;
    } catch (e) {
        console.log("Logout error: ", e);
        res.status(400).send({
            success: false,
            message: "Logout API error."
        });
        return;
    }
    
};

export async function update(req: RequestWithAuth, res: Response) {
    try {
        const { userName, name, email, contactNo, dateOfBirth } = req.body;

        const oldUser = await getUserAccount(req.email);

        const updatedData: User = {
            userName: userName || oldUser.userName,
            password: oldUser.password,
            name: name || oldUser.name,
            email: email || oldUser.email,
            contactNo: contactNo || oldUser.contactNo,
            dateOfBirth: dateOfBirth || oldUser.dateOfBirth,
            role: oldUser.role,
        };

        const success = await updateUserAccount(updatedData, oldUser);

        if (!success) {
            res.status(400).send({
                success: false,
                message: "Failed to update user account.",
            });
            return;
        }

        res.status(200).send({
            success: true,
            message: "Update is complete!",
        });
    } catch (e) {
        console.log("Update error: ", e);
        res.status(400).send({
            success: false,
            message: "Update API error.",
        });
        return;
    }
}

