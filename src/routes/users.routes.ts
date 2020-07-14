import { Router } from "express"; 
import passport from "passport"; 
import * as userController from "../controllers/user.controller";
import isAdmin from "../middlewares/isAdmin";

const router = Router();

router.route('/')
    .get(passport.authenticate('jwt', { session:false }), isAdmin, userController.list)
    .post(passport.authenticate('jwt', { session:false }), isAdmin, userController.create)
router.route('/:id')
    .get(passport.authenticate('jwt', { session:false }), isAdmin, userController.getById)
    .put(passport.authenticate('jwt', { session:false }), isAdmin, userController.update)
    .delete(passport.authenticate('jwt', { session:false }), isAdmin, userController.remove)

export default router; 