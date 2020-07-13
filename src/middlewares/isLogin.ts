import jwt from "jsonwebtoken"; 
import express, { Response, NextFunction } from "express"; 
import logger from "../common/logger";
import { status } from "../config/constants";
import config from "../config/config"; 

const isLogin = (req: any, res: Response, next: NextFunction) => {
    try {
       const token = req.userToken;
        /* if (!token) return res.status(status.UNAUTHORIZED).send("Access Denied!");

        const payload = jwt.verify(token, config.jwtSecret); */
        console.log(token);
        next();
    } catch (error) {
        logger.error("Error verifing credentials");
        throw error; 
    }
}

export default isLogin;