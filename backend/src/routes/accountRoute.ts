//@ts-nocheck
import { Router } from "express";
import { register, deleteAccount, logIn, logOut, update, getProfile } from "../controllers/accountController";
import { authenticate } from "../middleware/jwt-auth";

const router = Router();

router.post("/register", register);
router.patch("/update", authenticate, update);
router.delete("/delete", authenticate, deleteAccount);
router.post("/login", logIn);
router.get("/logout", authenticate, logOut);
router.get("/view", authenticate, getProfile);
export default router;