//@ts-nocheck
import { Router } from "express";
import { register, deleteAccount, logIn, logOut, update } from "../controllers/authController";

const router = Router();

router.post("/register", );
router.patch("/update", );
router.delete("/delete", );
router.post("/login", );
router.post("/logout", );

export default router;