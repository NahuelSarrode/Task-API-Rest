import { Request, Response } from "express";
import jwt from "jsonwebtoken"; 
import User, { IUser } from "../models/user";
import { status } from "../config/constants";
import config from "../config/config";

// Create a new user with email and password.
export const signUp = async (req: Request, res: Response)=> {
    if (!req.body.email || !req.body.email) return res.status(status.BAD_REQUEST).json({messagge: "Please, send your email and password"});
    
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(status.BAD_REQUEST).json({ messagge: "User already in use" });

    const newUser = new User(req.body);

    await newUser.save(); 

    res.status(status.OK).json(newUser);
}

export const signIn = async (req: Request, res: Response) => {
    if (!req.body.email || !req.body.email) return res.status(status.BAD_REQUEST).json({messagge: "Please, send your email and password"});

    const user = await User.findOne({ email: req.body.email });     
    if (!user) return res.status(status.BAD_REQUEST).json({ messagge: "The user doesnt exist" });

    const isMatch = await user.comparePassword(req.body.password);

    if (isMatch) {
        return res.status(status.OK).json({ token: createToken(user) });
    }

    return res.status(status.BAD_REQUEST).json({
        messagge: "Email or password are incorrect!"
    });
}

// Create a token validator. 
function createToken(user: IUser) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
        expiresIn: '12h'
    });
}