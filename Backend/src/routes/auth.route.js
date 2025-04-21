import express from "express";//Routing yapmak için
import { signup, login, logout } from "../controllers/auth.controller.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;