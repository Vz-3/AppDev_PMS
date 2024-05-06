import { Request, Response } from 'express';
import { BuildingType, Unit, Building, UnitStatus, UnitType } from '../models/database/propertySchema';
import { getUserAccountById } from '../services/accountService';
import { assignUnit, evictTenant, createProperty, deletePropertyAndUnits, getProperty, getProperties, updateProperty, populateBuildingUnits, getPropertyUnits, getPropertyUnit, getPropertyById } from '../services/propertyService';
import { RequestWithAuth } from '../types';
import { startSession } from 'mongoose';
import { getLocalDate } from '../utilities/utils';

export async function createPropertyAPI(req: RequestWithAuth, res: Response) {
    const session = await startSession();
    session.startTransaction();

    try {
        const userId = req._id;
        const user = await getUserAccountById(userId);
        const { buildingType, buildingName, address1, city, noOfUnits, unitMonthlyCost, address2, misc, modeOfPayment, leaseStartDate, leaseEndDate, uMisc } = req.body;
        if (!user || !buildingType || !buildingName || !address1 || !city || !noOfUnits || typeof unitMonthlyCost !== 'number') {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }

        const building: Building = {
            buildingType: buildingType || BuildingType.APARTMENT,
            buildingName: buildingName,
            buildingOwner: req._id.toString(),
            address1: address1,
            address2: address2 || '',
            city: city,
            noOfUnits: noOfUnits,
            misc: misc
        }

        const success = await createProperty(user, building, session);
        if (!success) {
            res.status(400).send({ 
                success: false,
                message: "Failed to create property." 
            });
            return;
        }

        const newBuilding = await getProperty(buildingName);
        if (!newBuilding || !newBuilding._id) {
            res.status(400).send({ 
                success: false,
                message: "Failed to get property information." 
            });
            return;
        }

        const date = await getLocalDate();
        // Populate default units
        for (let i = 1; i <= noOfUnits; i++) {
            const unit: Unit = {
                unitNo: i,
                unitType: UnitType.DUO,
                status: UnitStatus.VACANT,
                buildingId: newBuilding._id?.toString(),
                unitMonthlyCost: unitMonthlyCost || 0,
                tenant: '',
                modeOfPayment: modeOfPayment || 'gcash://pay?data=',
                leastStartDate: leaseStartDate || date,
                leastEndDate: leaseEndDate || date,
                paymentHistory: [],
                misc: uMisc || ''
            }
            const initSuccess = await populateBuildingUnits(user, unit, session);
            if (!initSuccess) {
                throw new Error("Failed to create units.");
            }
        }

        res.status(200).send({
            success: true,
            message: 'Property created successfully!'
        });

    } catch (e) {
        console.log("Create property error: ", e);
        await session.abortTransaction();
        res.status(400).send({
            success: false,
            message: "Create property API error.",
            e
        });
        return;
    } finally {
        session.endSession();
    }
}

// gives building IDs, which allows getUnitsOfPropertyAPI to get units of a building.
export async function getPropertiesAPI(req: RequestWithAuth, res: Response) {
    try {
        const userId = req._id;
        const user = await getUserAccountById(userId);
        if (!user) {
            res.status(400).send({ 
                success: false,
                message: "User not found." 
            });
            return;
        }

        const properties = await getProperties(user, req._id.toString());
        res.status(200).send({
            success: true,
            properties
        });

    } catch (e) {
        console.log("Get properties error: ", e);
        res.status(400).send({
            success: false,
            message: "Get properties API error.",
            e
        });
        return;
    }
}

// get units of a building, to allow owner to assign tenant to a unit with unit id.
export async function getUnitsOfPropertyAPI(req: RequestWithAuth, res: Response) {
    try {
        const userId = req._id;
        const user = await getUserAccountById(userId);
        const { buildingId } = req.body;
        if (!user || !buildingId) {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }

        const units = await getPropertyUnits(user, buildingId);
        res.status(200).send({
            success: true,
            message: `Building units of ${buildingId}.`,
            units: units
        });

    } catch (e) {
        console.log("Get units of property error: ", e);
        res.status(400).send({
            success: false,
            message: "Get units of property API error.",
            e
        });
        return;
    }
}

export async function deletePropertyAPI(req: RequestWithAuth, res: Response) {
    const session = await startSession();
    session.startTransaction();

    try {
        const userId = req._id;
        const user = await getUserAccountById(userId);
        const { propertyId } = req.body;
        if (!user || !propertyId) {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }

        const success = await deletePropertyAndUnits(user, propertyId, session);
        if (!success) {
            res.status(400).send({ 
                success: false,
                message: "Failed to delete property." 
            });
            return;
        }

        res.status(200).send({
            success: true,
            message: 'Property deleted successfully!'
        });

    } catch (e) {
        console.log("Delete property error: ", e);
        await session.abortTransaction();
        res.status(400).send({
            success: false,
            message: "Delete property API error.",
            e
        });
        return;
    } finally {
        session.endSession();
    }
}

// to assign tenant, owner should be able to view building and all units. then select a unit, which has it's own ID, so use getUnit, then you can assign.
export async function getUnitInfoAPI(req: RequestWithAuth, res: Response) {
    try {
        const userId = req._id;
        const user = await getUserAccountById(userId);
        const { unitId } = req.body;
        if (!user || !unitId) {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }

        const unit = await getPropertyUnit(unitId);
        res.status(200).send({
            success: true,
            message: `Unit information of ${unit.unitNo}.`,
            unit: unit
        });

    } catch (e) {
        console.log("Get unit info error: ", e);
        res.status(400).send({
            success: false,
            message: "Get unit info API error.",
            e
        });
        return;
    }
}

export async function assignTenantAPI(req: RequestWithAuth, res: Response) {
    try {
        // get tenant by their email/ID, then assign them to a unit. but there should be view tenants but that's for next time
        const userId = req._id;
        const { unitId, tenantId, unitType, leastStartDate, leastEndDate, unitMonthlyCost } = req.body;
        if (!unitId || !tenantId || !unitType || !leastStartDate || !leastEndDate || !unitMonthlyCost) {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }

        const user = await getUserAccountById(userId);
        const unit = await getPropertyUnit(unitId);
        if (!user || !unit) {
            res.status(400).send({ 
                success: false,
                message: "User or unit not found." 
            });
            return;
        }

        const updatedUnit: Unit = {
            ...unit, //creates a copy of the data but allows the overwrite of some fields.
            unitType: unitType,
            tenant: tenantId,
            leastStartDate: leastStartDate,
            leastEndDate: leastEndDate,
            unitMonthlyCost: unitMonthlyCost
        }

        const success = await assignUnit(user, updatedUnit);

        if (!success) {
            res.status(400).send({ 
                success: false,
                message: "Failed to assign tenant to unit." 
            });
            return;
        }

        res.status(200).send({
            success: true,
            message: 'Tenant assigned to unit successfully!'
        });

    } catch (e) {
        console.log("Assign tenant error: ", e);
        res.status(400).send({
            success: false,
            message: "Assign tenant API error.",
            e
        });
        return;
    }
}

export async function evictTenantAPI(req: RequestWithAuth, res: Response) {
    try {
        const userId = req._id;
        const { unitId, defaultMonthlyCost } = req.body;
        if (!unitId) {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }

        const user = await getUserAccountById(userId);
        const unit = await getPropertyUnit(unitId);
        if (!user || !unit) {
            res.status(400).send({ 
                success: false,
                message: "User or unit not found." 
            });
            return;
        }

        const updatedUnit: Unit = {
            ...unit,
            tenant: '',
            leastStartDate: unit.leastEndDate,
            unitMonthlyCost: defaultMonthlyCost || 0 //if default monthly cost is not adjusted
        }

        const success = await evictTenant(user, unit);

        if (!success) {
            res.status(400).send({ 
                success: false,
                message: "Failed to evict tenant from unit." 
            });
            return;
        }

        res.status(200).send({
            success: true,
            message: 'Tenant evicted from unit successfully!'
        });

    } catch (e) {
        console.log("Evict tenant error: ", e);
        res.status(400).send({
            success: false,
            message: "Evict tenant API error.",
            e
        });
        return;
    }
}

export async function updatePropertyAPI(req: RequestWithAuth, res: Response) {
    try {
        const userId = req._id;
        const user = await getUserAccountById(userId);
        // can't transfer ownership for now. Maybe another function.
        const { buildingId, buildingType, buildingName, address1, address2, city, misc } = req.body;
        if (!user || !buildingId) {
            res.status(400).send({ 
                success: false,
                message: "Please provide all required fields." 
            });
            return;
        }

        const oldBuilding = await getPropertyById(buildingId);
        if (!oldBuilding) {
            res.status(400).send({ 
                success: false,
                message: "Building not found." 
            });
            return;
        }

        const newBuilding: Building = {
            buildingType: buildingType || oldBuilding.buildingType,
            buildingName: buildingName || oldBuilding.buildingName,
            buildingOwner: oldBuilding.buildingOwner,
            address1: address1 || oldBuilding.address1,
            address2: address2 || oldBuilding.address2,
            city: city || oldBuilding.city,
            noOfUnits: oldBuilding.noOfUnits, //should not change no of units otherwise we have to repopulate units again.
            misc: misc || oldBuilding.misc
        }
        
        const success = await updateProperty(user, oldBuilding, newBuilding);
        if (!success) {
            res.status(400).send({ 
                success: false,
                message: "Failed to update property." 
            });
            return;
        }
    } catch (error) {
        console.log("Update property error: ", error);
        res.status(400).send({
            success: false,
            message: "Update property API error.",
            error
        });
        return;
    }
}