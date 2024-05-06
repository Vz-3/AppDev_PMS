//@ts-nocheck
import { Router } from "express";
import { registerAPI, deleteAccountAPI, logInAPI, logOutAPI, updateAPI, viewProfileAPI, resetPasswordAPI } from "../controllers/accountController";
import { authenticate } from "../middleware/jwt-auth";

const router = Router();

//refresh token function?
router.post("/register", registerAPI);
router.patch("/update", authenticate, updateAPI);
router.delete("/delete", authenticate, deleteAccountAPI);
router.post("/login", logInAPI);
router.get("/logout", authenticate, logOutAPI);
router.get("/view", authenticate, viewProfileAPI);
router.post("/reset_password", authenticate, resetPasswordAPI);
export default router;