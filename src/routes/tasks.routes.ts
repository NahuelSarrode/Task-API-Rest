import { Router } from "express"; 
import passport from "passport"; 

import * as taskController from "../controllers/task.controller";

const router = Router();

router.route('/')
    .get(taskController.list)
    .post(taskController.create)
            
router.route('/:_id')
    .delete(taskController.remove)
    .put(taskController.update)

export default router; 