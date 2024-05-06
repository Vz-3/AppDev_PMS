//@ts-nocheck
import { Router } from "express";
import { createPropertyAPI, getBldg, getPropertiesAPI, deletePropertyAPI, updatePropertyAPI, getUnitsOfPropertyAPI, getUnitInfoAPI, assignTenantAPI, evictTenantAPI, updateUnitPropertyAPI, getBldgOwner} from "../controllers/propertyController";
import { authenticate } from "../middleware/jwt-auth";

const router = Router();

router.post("/create", authenticate, createPropertyAPI);
router.patch("/update", authenticate, updatePropertyAPI);
router.delete("/delete", authenticate, deletePropertyAPI);
router.get("/view", authenticate, getPropertiesAPI);
router.get("/view/units", authenticate, getUnitsOfPropertyAPI);
router.get("/unit/view", authenticate, getUnitInfoAPI);
router.patch("/unit/assign", authenticate, assignTenantAPI);
router.patch("/unit/evict", authenticate, evictTenantAPI);
router.put("/unit/update", authenticate, updateUnitPropertyAPI);
router.get("/view/owner", getBldgOwner); // for tenant to get their owner name
router.get("/view/bldg", getBldg); // for tenant to get their bldg
export default router;