import { Request, Response } from "express"; 
import logger from '../common/logger'; 
import { status } from '../config/constants'
import Task,{ ITask } from '../models/task';


export const create = async (req: Request, res: Response) => {
    res.render('tasks/create');
}

export const save = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body; 
        const task: ITask = new Task({ title, description });

        const saved = await task.save();
        console.log(saved);

        res.status(status.OK).redirect('/tasks/list');
    } catch (error) {
        logger.error("Error saving task: ", error);
        throw error;
    }
}

export const list = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find().lean(); 
        
        res.render('tasks/list', {tasks});        
    } catch (error) {
        logger.error("Error getting tasks: ", error);
        throw error;
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; 
        await Task.findByIdAndDelete(id);

        res.redirect('/tasks/list');
    } catch (error) {
        logger.error("Error deleting task by id: ", error);
        throw error;
    }
}

export const edit = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; 
        const task = await Task.findById(id).lean();
    
        res.render('tasks/edit', {task});   
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