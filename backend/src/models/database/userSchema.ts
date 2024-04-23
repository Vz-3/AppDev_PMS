import { Schema, Types } from "mongoose";

export enum Role {
    ADMIN = 'admin',
    OWNER = 'owner',
    TENANT = 'tenant'
}

// Typescript types
export interface User {
    _id?: Types.ObjectId,
    userName: string,
    password: string,
    name: {
        firstName: string,
        middleName?: string,
        lastName: string,
    },
    email: string,
    contactNo: string,
    dateOfBirth: Date,
    role: Role,
    unitNo?: Number,
    properties?: Types.ObjectId[],
    loggedAt?: Date
}

// Mongoose Schema
export const userSchema: Schema<User> = new Schema({
        userName: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        name: {
            firstName: { type: String, required: true },
            middleName: { type: String },
            lastName: { type: String, required: true }
        },
        email: { type: String, required: true, unique: true },
        contactNo: { type: String, required: true },
        dateOfBirth: { type: Date, required: true },
        role: { type: String, required: true, enum: Object.values(Role), default: Role.TENANT},
        unitNo: { type: Number },
        properties: { type: [{ type: Types.ObjectId, ref: 'Property' }], default: []},
        loggedAt: { type: Date }
});