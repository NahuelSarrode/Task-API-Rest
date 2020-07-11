import { Schema, model, Document } from 'mongoose'; 

export interface ITask extends Document {
    title: string, 
    description: string
}

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true, 
        lowercase: true
    },
    description: {
        type: String, 
        required: true, 
        lowercase: true
    }
});

export default model<ITask>('Taks', TaskSchema);