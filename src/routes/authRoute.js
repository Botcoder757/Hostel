import{Router} from 'express';
import {create_user} from "../controller/auth.js";

const router=Router();

router.post("/",create_users);
export default router;