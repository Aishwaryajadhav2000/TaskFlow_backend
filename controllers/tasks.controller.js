import taskSchema from "../models/Tasks.model.js";
import usersSchema from "../models/Users.model.js";
import { v4 as uuidv4 } from "uuid";


export async function createTask(req, res , next) {

    try {
        const { description, taskAssign, taskStatus} = req.body;
        const userId = req.user._id
        const newTask = new taskSchema({ 
            taskId : uuidv4(),
            description, taskAssign, taskStatus, owner: userId 
        });
        const newTaskCreated = await newTask.save();
        const user = await usersSchema.findById(userId);
        user.tasks.push(newTaskCreated._id);
        await user.save();
        return res.status(200).json({ message: "task created..", task: newTaskCreated })

    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}


export async function createTask2(req, res) {
    try {
        const { description, taskAssign, taskStatus, owner } = req.body;

        const newTask = new taskSchema({
            taskId: uuidv4(),
            description,
            taskAssign,
            taskStatus,
            owner // use directly from request body
        });

        const newTaskCreated = await newTask.save();

        const user = await usersSchema.findById(owner); // use owner id

        user.tasks.push(newTaskCreated._id);
        await user.save();

        return res.status(200).json({ message: "task created..", task: newTask });
    } catch (err) {
        return res.status(400).json({ message: "error", err: err.message });
    }
}

export async function getTasks(req, res, next) {
    return res.status(200).json({ message: "Working" })
}