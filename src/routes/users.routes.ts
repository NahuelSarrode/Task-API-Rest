import { Router } from "express"; 
import * as userController from "../controllers/user.controller";
const router = Router();

router.route('/')
    .get(userController.list);

router.route('/:id')
    .get(userController.getById);

export default router; 