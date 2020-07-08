import { Request, Response } from "express";
import jwt from "jsonwebtoken"; 
import User, { IUser } from "../models/user";
import { status } from "../config/constants";
import config from "../config/config";
import logger from "../common/logger";

// Create a new user with email and password.
export const signUp = async (req: Request, res: Response)=> {
    try {
        if (!req.body.email || !req.body.email) return res.status(status.BAD_REQUEST).json({messagge: "Please, send your email and password"});
    
        const user = await User.findOne({ email: req.body.email});
        if (user) return res.status(status.BAD_REQUEST).json({ messagge: "User already in use" });

        const newUser = new User(req.body);

        await newUser.save(); 

        res.status(status.OK).json(newUser);
    } catch (error) {
        logger.error("Cant create user: ", error);
        throw error; 
    }
}

// Login user with token authentication
export const signIn = async (req: Request, res: Response) => {
    try {
        if (!req.body.email || !req.body.email) return res.status(status.BAD_REQUEST).json({messagge: "Please, send your email and password"});

        const user = await User.findOne({ email: req.body.email });     
        if (!user) return res.status(status.BAD_REQUEST).json({ messagge: "The user doesnt exist" });

        const isMatch = await user.comparePassword(req.body.password);

        if (isMatch) {
            return res.header({ token: createToken(user) }).json({user});
        }

        return res.status(status.BAD_REQUEST).json({
            messagge: "Email or password are incorrect!"
        });
    } catch (error) {
        logger.error("Cant validate user ", error);
        throw error;
    }
}

// Create a token validator. 
function createToken(user: IUser) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
        expiresIn: '12h'
    });
}