//@ts-nocheck
import { Router } from "express";
import { register, deleteAccount, logIn, logOut, update } from "../controllers/accountController";

const router = Router();

router.post("/register", register);
router.patch("/update", update);
router.delete("/delete", deleteAccount);
router.post("/login", logIn);
router.get("/logout", logOut);

export default router;