import{Router} from 'express';
import {create_user} from "../controller/Auth.js";

const router=Router();

router.post("/",create_user);
export default router;