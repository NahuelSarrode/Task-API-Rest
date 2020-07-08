import { Router, Request, Response } from "express"; 
import * as taskController from "../controllers/task.controller";
const router = Router();

router.get('/create', taskController.create);

export default router; 