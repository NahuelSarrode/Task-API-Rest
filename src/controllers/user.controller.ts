import express, { Request, Response } from "express";
import jwt from "jsonwebtoken"; 
import User, { IUser } from "../models/user";
import { status } from "../config/constants";
import config from "../config/config";
import logger from "../common/logger";
import task from "../models/task";

// Create a new user with email and password.
export const signUp = async (req: Request, res: Response)=> {
    try {
        if (!req.body.email || !req.body.password) return res.status(status.BAD_REQUEST).json({messagge: "Please, send your email and password"});
    
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
        if (!req.body.email || !req.body.password) return res.status(status.BAD_REQUEST).json({messagge: "Please, send your email and password"});
    
        const user = await User.findOne({ email: req.body.email });
        console.log(user);     
        if (!user) return res.status(status.BAD_REQUEST).json({ messagge: "The user doesnt exist" });

        const isMatch = await user.comparePassword(req.body.password);

        if (isMatch) {
            return res.header({token: createToken(user)}).json(user);
        }

        return res.status(status.BAD_REQUEST).json({
            messagge: "Email or password are incorrect!"
        });
    } catch (error) {
        logger.error("Cant validate user ", error);
        throw error;
    }
}

// list of users 
export const list = async (req: Request, res: Response) => {
    try {
        const users = await User.find();

        res.json(users);
    } catch (error) {
        logger.error("Cant get users ", error);
        throw error;
    }
}

// get user by id 
export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; 
        const user = await User.findById(id);

        res.json(user);
    } catch (error) {
        logger.error("Cant get user by id ", error);
        throw error;
    }
} 

// create a user 
export const create = async (req: Request, res: Response) => {
    try {
        const { email, password, role } = req.body; 

        const newUser = new User({
            email, 
            password,
            role
        })

        await newUser.save();

        res.sendStatus(status.OK);
    } catch (error) {
        logger.error("Cant get user by id ", error);
        throw error;
    }
}

// Create a token validator. 
function createToken(user: IUser) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
        expiresIn: '12h'
    });
}