import {Router} from "express";
import { protectRoute } from "../middleware/auth";
import { getUsers } from "../controllers/userControllers";

const router =Router();

router.get("/",protectRoute,getUsers);
export default router;