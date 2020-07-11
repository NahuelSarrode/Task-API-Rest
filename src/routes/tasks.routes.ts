import { Router, Request, Response } from "express"; 
import * as taskController from "../controllers/task.controller";
const router = Router();

router.get('/create', taskController.create);
router.post('/save', taskController.save);
router.get('/list', taskController.list);
router.get('/delete/:id', taskController.remove);
router.get('/edit/:id', taskController.edit);
router.post('/update/:id', taskController.update);

export default router; 