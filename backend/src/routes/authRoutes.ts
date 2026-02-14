import {Router} from "express";
import { authCallback, getMe } from "../controllers/authControllers";
import { protectRoute } from "../middleware/auth";
const router =Router();


router.get("/me",protectRoute, getMe);
router.post("/callback", authCallback);




export default router;