import { Router } from "express"; 
import * as userController from "../controllers/user.controller";
const router = Router();

router.route('/')
    .get(userController.list)
    .post(userController.create)

router.route('/:id')
    .get(userController.getById)
    .put(userController.update)
    .delete(userController.remove)

export default router; 