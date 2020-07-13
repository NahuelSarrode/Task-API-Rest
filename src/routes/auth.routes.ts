import { Router } from "express";
import { signIn, signUp } from "../controllers/user.controller";

const router = Router(); 

router.route('/login')
    .post(signIn); 

router.route('/signup')
    .post(signUp); 

export default router; 