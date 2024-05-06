import { Request } from "express";

export interface RequestWithAuth extends Request { 
    _id: string;
    email: string;
    authString: string;
}