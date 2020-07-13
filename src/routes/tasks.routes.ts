import { Router } from "express"; 
import passport from "passport"; 

import * as taskController from "../controllers/task.controller";

const router = Router();

router.route('/')
    .get(passport.authenticate('jwt', { session:false }), taskController.list)
    .post(passport.authenticate('jwt', { session:false }),taskController.create)
            
router.route('/:id')
    .get(passport.authenticate('jwt', { session:false }),taskController.getById)
    .delete(passport.authenticate('jwt', { session:false }),taskController.remove)
    .put(passport.authenticate('jwt', { session:false }),taskController.update)

export default router; 