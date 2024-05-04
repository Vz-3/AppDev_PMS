import { Schema, Types } from "mongoose";

export enum BuildingType {
    APARTMENT = 'apartment',
    CONDO = 'condo'
}

export enum UnitStatus {
    VACANT = 'vacant',
    OCCUPIED = 'occupied',
    MAINTENANCE = 'maintenance'
}

// Typescript types
export interface Building {
    _id?: Types.ObjectId,
    buildingType: BuildingType,
    buildingName: string,
    buildingOwner: string, // Technically owner email or ID from user schema
    address1: string,
    address2?: string,
    city: string,
    noOfUnits: Number,
    tenants: Types.ObjectId[], // List of tenant IDs from user schema
    misc?: string,
    createdAt?: Date
}

export interface Unit {
    _id?: Types.ObjectId,
    unitNo: Number,
    status: UnitStatus,
    buildingId: string,
    unitMonthlyCost: Number,
    tenant: string // List of tenant IDs from user schema
    modeOfPayment: string, // link to qr code image? bare bones payment implementation
    leastStartDate?: Date,
    leastEndDate?: Date,
    paymentHistory?: [{ date: Date, amount: Number }],
    misc?: string,
}

// Mongoose Schema
export const buildingSchema: Schema<Building> = new Schema({
    buildingType: { type: String, required: true, enum: Object.values(BuildingType), default: BuildingType.APARTMENT},
    buildingName: { type: String, required: true},
    buildingOwner: { type: String, required: true}, 
    address1: { type: String, required: true},
    address2: { type: String },
    city: { type: String, required: true}, // should be a dropdown list
    noOfUnits: { type: Number, required: true},
    tenants: { type: [{ type: Types.ObjectId, ref: 'Tenants'}], required: true},
    misc: { type: String },
    createdAt: { type: Date}
});

export const unitSchema: Schema<Unit> = new Schema({
    unitNo: { type: Number, required: true},
    status: { type: String, required: true, enum: Object.values(UnitStatus), default: UnitStatus.VACANT},
    buildingId: { type: String, ref: 'Building', required: true},
    unitMonthlyCost: { type: Number, required: true},
    tenant: { type: String, ref: 'User'},
    modeOfPayment: { type: String, required: true},
    leastStartDate: { type: Date },
    leastEndDate: { type: Date },
    paymentHistory: { type: [{ date: Date, amount: Number }]},
    misc: { type: String },
});