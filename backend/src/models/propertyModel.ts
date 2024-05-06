import { db } from "./database/mongodbConfig";
import { Building, BuildingType, Unit, UnitStatus } from "./database/propertySchema";
import { Role, User } from "./database/userSchema";

export class PropertyModel {
    
    async validateOwnerThroughUnit(user: User, unit: Unit): Promise<boolean> {
        try {
            const building = await db.BuildingModel.findOne({ _id: unit.buildingId });
            if (!building || !user._id) {
                console.log("validateOwnerThroughUnit error: Building/User not found");
                return false;
            }

            if (building.buildingOwner !== user._id.toString()) {
                console.log("validateOwnerThroughUnit error: Only building owner can perform this operation");
                return false;
            }
            return true;
        } catch (error) {
            console.log("validateOwnerThroughUnit error: ", error);
            return false;
        }
    }

    async validateOwnerThroughBldg(user: User, buildingName: string): Promise<boolean> {
        const building = await db.BuildingModel.findOne({ buildingName: buildingName });
        if (!building || !user._id) {
            console.log("validateOwnerThroughBldg error: Building/User not found");
            return false;
        }

        if (building.buildingOwner !== user._id.toString()) {
            console.log("validateOwnerThroughBldg error: Only building owner can perform this operation");
            return false;
        }
        return true;
    }

    async assignTenantToUnit(user: User, unit: Unit): Promise<boolean> {
        try {
            const ownerValidated = await this.validateOwnerThroughUnit(user, unit);
            
            if (!ownerValidated) {
                console.log("assignTenantToUnit error: Only building owner can assign tenant from unit");
                return false;
            }

            const success = await db.UnitModel.updateOne({ _id: unit._id }, unit);
            if (!success) {
                console.log("assignTenantToUnit error: Failed to assign tenant to unit");
                return false;
            }
            return true;
        } catch (error) {
            console.log("assignTenantToUnit error: ", error);
            return false;
        }
    }

    async evictTenantFromUnit(user: User, unit: Unit): Promise<boolean> {
        try {
            const ownerValidated = await this.validateOwnerThroughUnit(user, unit);
            
            if (!ownerValidated) {
                console.log("evictTenantFromUnit error: Only building owner can evict tenant from unit");
                return false;
            }

            const success = await db.UnitModel.updateOne({ _id: unit._id }, { tenant: null });
            if (!success) {
                console.log("evictTenantFromUnit error: Failed to evict tenant from unit");
                return false;
            }
            return true;
        } catch (error) {
            console.log("evictTenantFromUnit error: ", error);
            return false;
        }
    }

    async createBuilding(user: User, building: Building, session: any): Promise<boolean> {
        const buildingExists = await db.BuildingModel.findOne({ buildingName: building.buildingName });
        if (buildingExists) {
            console.log("createBuilding error: Building name already exists");
            return false;
        }

        if (user._id?.toString() !== building.buildingOwner) {
            console.log("createBuilding error: User is not the owner of the building");
            return false;
        } //redundant but just in case.

        const building_data = new db.BuildingModel(building);
        try {
            await building_data.save({ session });
            return true;
        } catch (error) {
            console.log("createBuilding error: ", error);
            return false;
        }
    }

    async deleteBuilding(user: User, buildingName: string, session: any): Promise<boolean> {
        try {
            const foundBuilding = await db.BuildingModel.findOne({ buildingName: buildingName });
            if (!foundBuilding) {
                console.log("deleteBuilding error: Building not found");
                return false;
            }

            const ownerValidated = await this.validateOwnerThroughBldg(user, buildingName);
            if (!ownerValidated) {
                console.log(`deleteBuilding error: Only building owner can delete building`);
                return false;
            }

            const buildingDeleted = await db.BuildingModel.deleteOne({ buildingName: buildingName }).session(session);
            if (!buildingDeleted) {
                console.log("deleteBuilding error: Building not deleted");
                return false;
            }
            return true;
        } catch (error) {
            console.log("deleteBuilding error: ", error);
            return false;
        }
    }

    async getBuildingInformationByName(buildingName: string): Promise<Building> {
        const building = await db.BuildingModel.findOne({ buildingName: buildingName });
        if (!building) {
            console.log("getBuilding error: Building not found");
            throw new Error("Building not found");
        }
        return building;
    }

    async getBuildingInformation(buildingId: string): Promise<Building> {
        const building = await db.BuildingModel.findOne({ _id: buildingId });
        if (!building) {
            console.log("getBuilding error: Building not found");
            throw new Error("Building not found");
        }
        return building;
    }

    async getBuildings(buildingOwner: string): Promise<Building[]> {
        const buildings = await db.BuildingModel.find({ buildingOwner: buildingOwner });

        if (!buildings) {
            console.log(`getBuildings error: Buildings of ${buildingOwner} not found!`);
            throw new Error("Buildings not found");
        }
        return buildings;
    }

    async updateBuilding(user: User, oldBuilding: Building, newBuilding: Building): Promise<boolean> {
        try {
            const ownerValidated = await this.validateOwnerThroughBldg(user, oldBuilding.buildingName);
            if (!ownerValidated) {
                console.log("updateBuilding error: Only building owner can update building");
                return false;
            }

            await db.BuildingModel.updateOne({ _id: oldBuilding._id }, newBuilding);
            return true;
        } catch (error) {
            console.log("updateBuilding error: ", error);
            return false;
        }
    }

    async createUnit(user: User, unit: Unit, session: any): Promise<boolean> {
        const unitExists = await db.UnitModel.findOne({ unitNo: unit.unitNo });
        if (unitExists) {
            console.log("createUnit error: Unit already exists");
            return false;
        }

        unit.status = UnitStatus.VACANT;
        const unit_data = new db.UnitModel(unit);
        try {
            await unit_data.save({ session });
            return true;
        } catch (error) {
            console.log("createUnit error: ", error);
            return false;
        }
    }

    async deleteUnitsOfProperty(user: User,propertyId: string, session: any): Promise<boolean> {
        try {
            const ownerValidated = await this.validateOwnerThroughBldg(user, propertyId);
            if (!ownerValidated) {
                console.log("deleteUnitsOfProperty error: Only building owner can delete units");
                return false;
            }

            await db.UnitModel.deleteMany({ buildingId: propertyId }).session(session);
            return true;
        } catch (error) {
            console.log("deleteUnitsOfProperty error: ", error);
            return false;
        }
    }

    async updateUnit(user: User, oldUnit: Unit, newUnit: Unit): Promise<boolean> {
        try {
            const ownerValidated = await this.validateOwnerThroughUnit(user, oldUnit);
            if (!ownerValidated) {
                console.log("updateUnit error: Only building owner can update unit");
                return false;
            }

            await db.UnitModel.updateOne({ _id: oldUnit._id }, newUnit);
            return true;
        } catch (error) {
            console.log("updateUnit error: ", error);
            return false;
        }
    }

    async getBuildingUnits(user: User, buildingId: string): Promise<Unit[]> {
        const building = await db.BuildingModel.findOne({ _id: buildingId });
        if (!building) {
            console.log("getBuildingUnits error: Building not found");
            throw new Error("Building not found");
        }

        const ownerValidated = await this.validateOwnerThroughBldg(user, building.buildingName);
        if (!ownerValidated) {
            console.log("getBuildingUnits error: Only building owner can get building units");
            return [];
        }

        const units = await db.UnitModel.find({ buildingId: buildingId });
        if (!units) {
            console.log("getBuildingUnits error: Units not found");
            throw new Error("Units not found");
        }
        return units;
    }

    async getUnit(unitId: string): Promise<Unit> {
        const unit = await db.UnitModel.findOne({ _id: unitId });
        if (!unit) {
            console.log("getUnit error: Unit not found");
            throw new Error("Unit not found");
        }
        return unit;
    }


}