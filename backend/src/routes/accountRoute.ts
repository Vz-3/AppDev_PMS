//@ts-nocheck
import { Router } from "express";
import { register, deleteAccount, logIn, logOut, update, viewProfile, resetPassword } from "../controllers/accountController";
import { authenticate } from "../middleware/jwt-auth";

const router = Router();

router.post("/register", register);
router.patch("/update", authenticate, update);
router.delete("/delete", authenticate, deleteAccount);
router.post("/login", logIn);
router.get("/logout", authenticate, logOut);
router.get("/view", authenticate, viewProfile);
router.post("/reset_password", authenticate, resetPassword);
export default router;