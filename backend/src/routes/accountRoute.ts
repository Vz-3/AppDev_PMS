//@ts-nocheck
import { Router } from "express";
import { registerAPI, deleteAccountAPI, logInAPI, logOutAPI, updateAPI, viewProfileAPI, resetPasswordAPI, getTenantsAPI, getAllUsersAPI } from "../controllers/accountController";
import { authenticate } from "../middleware/jwt-auth";
import { getMyUnit } from "../controllers/propertyController";

const router = Router();

//refresh token function?
router.post("/register", registerAPI);
router.patch("/update", authenticate, updateAPI);
router.delete("/delete", authenticate, deleteAccountAPI);
router.post("/login", logInAPI);
router.get("/logout", authenticate, logOutAPI);
router.get("/view", authenticate, viewProfileAPI);
router.post("/reset_password", authenticate, resetPasswordAPI);
router.get("/tenants/view", getTenantsAPI);
router.get("/users/view", getAllUsersAPI); // for messaging purposes. possibly dropdown? reflect Last name, but store Id to pass
router.get("/tenant/unit", authenticate, getMyUnit); // for tenant to view their unit info
export default router;