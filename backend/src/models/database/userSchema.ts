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
    loggedAt?: Date,
    unitNo?: Number,
    properties?: Types.ObjectId[],
}

// Mongoose Schema
export const userSchema: Schema<User> = new Schema({
        userName: { type: String, unique: true , required: true},
        password: { type: String, required: true },
        name: {
            firstName: { type: String, required: true },
            middleName: { type: String },
            lastName: { type: String, required: true }
        },
        email: { type: String, unique: true, required: true},
        contactNo: { type: String, required: true },
        dateOfBirth: { type: Date, required: true },
        role: { type: String, required: true, enum: Object.values(Role), default: Role.TENANT},
        loggedAt: { type: Date },
        unitNo: { type: Number, default: 0},
        properties: { type: [{ type: Types.ObjectId, ref: 'Property' }], default: []},
});