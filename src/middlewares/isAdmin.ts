import { Request, Response, NextFunction } from "express"; 
import logger from "../common/logger";
import { status } from "../config/constants";
import config from "../config/config"; 
import { IUser } from "../models/user";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: any = req.user;

        if (!user || user.role !== 'Admin') return res.status(status.UNAUTHORIZED).json({ messagge: "You must be an administrator" }); 
        
        next();
    } catch (error) {
        logger.error("Error verifing credentials on isAdmin");
        throw error; 
    }
}

export default isAdmin; 