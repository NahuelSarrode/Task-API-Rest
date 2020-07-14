import express, { Response, NextFunction } from "express"; 
import logger from "../common/logger";
import { status } from "../config/constants";
import config from "../config/config"; 

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        // TODO isAdmin method with mergin declaration. 
    } catch (error) {
        logger.error("Error verifing credentials on isAdmin");
        throw error; 
    }
}

export default isAdmin; 