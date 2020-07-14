import { Router } from "express"; 
import passport from "passport"; 
import * as userController from "../controllers/user.controller";
import isAdmin from "../middlewares/isAdmin";

const router = Router();

router.route('/')
    .get(isAdmin, userController.list)
    .post(passport.authenticate('jwt', { session:false }), userController.create)
router.route('/:id')
    .get(passport.authenticate('jwt', { session:false }), userController.getById)
    .put(passport.authenticate('jwt', { session:false }), userController.update)
    .delete(passport.authenticate('jwt', { session:false }), userController.remove)

export default router; 