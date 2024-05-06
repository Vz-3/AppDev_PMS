import { PropertyModel } from "../models/propertyModel";
import { Unit, Building } from "../models/database/propertySchema";
import { User } from "../models/database/userSchema";

const propertyModel = new PropertyModel();

export async function assignUnit(user: User, unit: Unit): Promise<boolean> {
    if (user.role !== "owner") {
        console.log("assignUnit error: Only Owner can assign tenant to unit");
        return false;
    }
    return propertyModel.assignTenantToUnit(user, unit);
}

export async function evictTenant(user: User, unit: Unit): Promise<boolean> {
    if (user.role !== "owner") {
        console.log("evictTenant error: Only Owner can evict tenant from unit");
        return false;
    }
    return propertyModel.evictTenantFromUnit(user, unit);
}

export async function createProperty(user: User, building: Building, session: any): Promise<boolean> {
    if (user.role !== "owner") {
        console.log("createProperty error: Only Owner can create property");
        return false;
    }
    return propertyModel.createBuilding(user, building, session);
}

export async function deleteProperty(user: User, buildingName: string, session: any): Promise<boolean> {
    if (user.role !== "owner") {
        console.log("deleteProperty error: Only Owner can delete property");
        return false;
    }
    return propertyModel.deleteBuilding(user, buildingName, session);
}

export async function getProperty( buildingName: string): Promise<Building> {
    return propertyModel.getBuildingInformationByName(buildingName);
}

export async function getPropertyById(buildingId: string): Promise<Building> {
    return propertyModel.getBuildingInformation(buildingId);
}

export async function getProperties(user: User, buildingOwner: string): Promise<Building[]> {
    if (user.role !== "owner") {
        console.log("getProperties error: Only Owner can get properties");
        return [];
    }
    return propertyModel.getBuildings(buildingOwner);
}

export async function updateProperty(user: User, oldBuilding: Building, newBuilding: Building): Promise<boolean> {
    if (user.role !== "owner") {
        console.log("updateProperty error: Only Owner can update property");
        return false;
    }
    return propertyModel.updateBuilding(user, oldBuilding, newBuilding);
}

export async function populateBuildingUnits(user: User, unit: Unit, session: any): Promise<boolean> {
    if (user.role !== "owner") {
        console.log("createPropertyUnit error: Only Owner can create property unit");
        return false;
    }
    return propertyModel.createUnit(user, unit, session);
}

export async function getPropertyUnits(user: User, buildingId: string): Promise<Unit[]> {
    if (user.role !== "owner") {
        console.log("getPropertyUnits error: Only Owner can get property units");
        return [];
    }
    return propertyModel.getBuildingUnits(user, buildingId);
}

export async function updatePropertyUnit(user: User, oldUnit: Unit, newUnit: Unit): Promise<boolean> {
    if (user.role !== "owner") {
        console.log("updatePropertyUnit error: Only Owner can update property unit");
        return false;
    }
    return propertyModel.updateUnit(user, oldUnit, newUnit);
}

export async function deleteUnits(user: User, buildingId: string, session: any): Promise<boolean> {
    if (user.role !== "owner") {
        console.log("deleteUnits error: Only Owner can delete units");
        return false;
    }
    return propertyModel.deleteUnitsOfProperty(user, buildingId, session);
}

export async function deletePropertyAndUnits(user: User, propertyId: string, session: any): Promise<boolean> {
    const property = await getPropertyById(propertyId);
    if (!user._id || !property || property.buildingOwner !== user._id.toString()) {
        return false;
    }

    const deleteUnitsSuccess = await propertyModel.deleteUnitsOfProperty(user, propertyId, session);
    if (!deleteUnitsSuccess) {
        throw new Error("Failed to delete units of property.");
    }

    const deletePropertySuccess = await deleteProperty(user, property.buildingName, session);
    if (!deletePropertySuccess) {
        throw new Error("Failed to delete property.");
    }

    return true;
}

export async function getPropertyUnit(unitId: string): Promise<Unit> {
    return propertyModel.getUnit(unitId);
}

export async function getTenantUnit(user: User): Promise<Unit> {
    return propertyModel.getUnitByTenant(user);
}