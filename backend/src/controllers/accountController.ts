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

export async function deleteAccount(req: RequestWithAuth, res: Response) {
    try {
        const email = req.email;
        console.log("Email: ", email);
        if (!email || typeof email !== 'string') 
        {
            console.log("Invalid email provided. Throwing exception...");
            res.status(400).send({message: "Incorrect or missing user email query was found!"});
            return;
        }
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
                message: "Invalid credentials. Passwords does not match!" 
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
        if (!res.headersSent) {
            res.status(400).send({
                success: false,
                message: "Logout API error."
            });
        }
        return;
    }
    
};

export async function viewProfile(req: RequestWithAuth, res: Response) {
    try {
        const userAccount = await getUserAccount(req.email);
        if (!userAccount) {
            res.status(400).send({ 
                success: false,
                message: "Failed to retrieve user account." 
            });
            return;
        }
        const { userName, name, email, contactNo, dateOfBirth, role, loggedAt, unitNo, properties } = userAccount;
        res.status(200).send({
            success: true,
            message: 'User account details.',
            username: userName,
            name: name,
            email: email,
            contactNo: contactNo,
            dateOfBirth: dateOfBirth,
            role: role,
            loggedAt: loggedAt,
            unitNo: unitNo,
            properties:properties
        });
    } catch (e) {
        console.log("View error: ", e);
        res.status(400).send({
            success: false,
            message: "viewProfile API error."
        });
        return;
    }
}

export async function resetPassword(req: RequestWithAuth, res: Response) {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }

        const userAccount = await getUserAccount(req.email);
        const isValidated = await validateUserPassword(userAccount, oldPassword);
        if (!isValidated) {
            res.status(400).send({ 
                success: false,
                message: "Invalid credentials. Passwords does not match!" 
            });
            return;
        }

        const updatedData: User = {
            userName: userAccount.userName,
            password: newPassword,
            name: userAccount.name,
            email: userAccount.email,
            contactNo: userAccount.contactNo,
            dateOfBirth: userAccount.dateOfBirth,
            role: userAccount.role,
        };

        const success = await updateUserAccount(userAccount, updatedData);

        if (!success) {
            res.status(400).send({
                success: false,
                message: "Failed to update password.",
            });
            return;
        }

        res.status(200).send({
            success: true,
            message: "Password reset is complete!",
        });

    } catch (e) {
        console.log("Reset error: ", e);
        res.status(400).send({
            success: false,
            message: "Reset API error.",
        });
        return;
    }
}

export async function update(req: RequestWithAuth, res: Response) {
    try {
        const email = req.email;
        const { userName, name, newEmail, contactNo, dateOfBirth } = req.body;

        const oldUser = await getUserAccount(req.email);
        
        if (email !== oldUser.email) {
            res.status(400).send({
                success: false,
                message: "Email does not match the user account.",
            });
            return;
        }

        const updatedData: User = {
            userName: userName || oldUser.userName,
            password: oldUser.password,
            name: name || oldUser.name,
            email: newEmail || oldUser.email,
            contactNo: contactNo || oldUser.contactNo,
            dateOfBirth: dateOfBirth || oldUser.dateOfBirth,
            role: oldUser.role,
        };

        const success = await updateUserAccount(oldUser, updatedData);

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

