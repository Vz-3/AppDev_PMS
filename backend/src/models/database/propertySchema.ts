import { Schema, Types } from "mongoose";

export type PaymentHistory = { date: Date, amount: Number };

export enum BuildingType {
    APARTMENT = 'apartment',
    CONDOMINIUM = 'condominium'
}

export enum UnitStatus {
    VACANT = 'vacant',
    OCCUPIED = 'occupied',
    MAINTENANCE = 'maintenance'
}

export enum UnitType {
    QUADRA = 'quadra',
    DUO = 'duo'
}
// Typescript types
export interface Building {
    _id?: Types.ObjectId,
    buildingType: BuildingType,
    buildingName: string,
    buildingOwner: string, // Technically owner ID from user schema
    address1: string,
    address2?: string,
    city: string,
    noOfUnits: Number,
    misc?: string,
}

export interface Unit {
    _id?: Types.ObjectId,
    unitNo: Number,
    unitType: UnitType,
    status: UnitStatus,
    buildingId: string,
    unitMonthlyCost: Number,
    tenant: string 
    modeOfPayment: string, // link to qr code image? bare bones payment implementation
    leastStartDate?: Date,
    leastEndDate?: Date,
    paymentHistory?: PaymentHistory[],
    misc?: string,
}

// Mongoose Schema
export const buildingSchema: Schema<Building> = new Schema({
    buildingType: { type: String, required: true, enum: Object.values(BuildingType), default: BuildingType.APARTMENT},
    buildingName: { type: String, required: true, unique: true},
    buildingOwner: { type: String, required: true}, 
    address1: { type: String, required: true},
    address2: { type: String },
    city: { type: String, required: true}, // should be a dropdown list
    noOfUnits: { type: Number, required: true},
    misc: { type: String },
});

export const unitSchema: Schema<Unit> = new Schema({
    unitNo: { type: Number, required: true},
    unitType: { type: String, required: true, enum: Object.values(UnitType), default: UnitType.QUADRA},
    status: { type: String, required: true, enum: Object.values(UnitStatus), default: UnitStatus.VACANT},
    buildingId: { type: String, ref: 'Building', required: true},
    unitMonthlyCost: { type: Number, required: true},
    tenant: { type: String, ref: 'User'},
    modeOfPayment: { type: String, required: true},
    leastStartDate: { type: Date },
    leastEndDate: { type: Date },
    paymentHistory: { type: Array<PaymentHistory>()},
    misc: { type: String },
});