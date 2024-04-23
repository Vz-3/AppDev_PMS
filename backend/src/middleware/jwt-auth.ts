import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { RequestWithAuth } from '../types';
import { AccountModel } from '../models/accountModel';
import { getLocalDate } from '../utilities/utils';

const accountModel = new AccountModel();
 
export async function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        const { authorization } = req.headers;
        if (!authorization){
            console.log("No authorization header was found. Throwing exception...");
            // throw new Error("Error: Please login.");
            res.status(400).send({message:" Please login, error in authorization header!"});
            return;
        }

        const authArray = authorization.split('.');
        const authPayload = authArray[1];
        const authPayloadObject = JSON.parse(Buffer.from(authPayload, 'base64').toString('utf-8'));

        const dbUser = await accountModel.getUser(authPayloadObject.email);
        if (!dbUser) {
            res.status(400).send({message:'Invalid user!'});
            return;
        }

        const tokenDate:Date = new Date(authPayloadObject.loggedAt);
        const currentDate = await getLocalDate();
        const storedDate:Date = dbUser?.loggedAt ?? new Date(0); //epoch

        const secretKey = `${process.env.SECRET_KEY}:${authPayloadObject.loggedAt}`;
        if (Math.abs(storedDate.getTime() - currentDate.getTime()) <= 1800000) {
            if (storedDate.getTime()>=tokenDate.getTime()) {
                res.status(400).send({
                    message: "You either logged out or have not previously logged in. Please login.",
                });
            }
        }

        jwt.verify(
            authorization,
            secretKey,
            async (err: any, userData: any) => {
                if (err){
                    console.log("Invalid JWT detected. Error: ", err);
                    res.status(400).send({
                        message: "Your access has expired. Please login again.",
                    });
                    return;
                }
                (req as RequestWithAuth)._id = userData._id;
                (req as RequestWithAuth).email = userData.email;
                (req as RequestWithAuth).authString = authPayload;
            }
        );
        next();
    } catch (e) {
        res.status(400).send({
            message: "Error during logout.",
        });
    }
}