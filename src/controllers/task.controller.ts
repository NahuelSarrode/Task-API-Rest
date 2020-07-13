import { Request, Response } from "express"; 
import logger from '../common/logger'; 
import { status } from '../config/constants'
import Task,{ ITask } from '../models/task';

export const create = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body; 
        const task: ITask = new Task({ title, description });

        const saved = await task.save();

        res.status(status.OK).json(saved);
    } catch (error) {
        logger.error("Error saving task: ", error);
        throw error;
    }
}

export const list = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find().lean(); 
        
        res.status(status.OK).json(tasks);        
    } catch (error) {
        logger.error("Error getting tasks: ", error);
        throw error;
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params; 
        await Task.findByIdAndDelete(_id);

        res.sendStatus(status.OK);
    } catch (error) {
        logger.error("Error deleting task by id: ", error);
        throw error;
    }
}


export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body; 

        await Task.findByIdAndUpdate(id, {title, description});
        console.log(id);
        res.redirect("/tasks/list");
    } catch (error) {
        logger.error("Error deleting task by id: ", error);
        throw error;
    }
}