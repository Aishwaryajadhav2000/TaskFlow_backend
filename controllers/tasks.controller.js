import taskSchema from "../models/Tasks.model.js";
import usersSchema from "../models/Users.model.js";
import { v4 as uuidv4 } from "uuid";


export async function createTask(req, res, next) {
    try {
        const { description, taskAssign, taskStatus } = req.body;
        const userId = req.user._id
        const newTask = new taskSchema({
            taskId: uuidv4(),
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

export async function getTaskById(req, res, next) {
   try{
     const taskId = req.params.id;
    const getTask = await taskSchema.findById(taskId);

    if (!getTask) {
        return res.status(400).json({ message: "Task not found" })
    }

    return res.status(200).json({ task: getTask })
   }catch(err){
    return res.status(500).json({message:err.message})
   }
}

export async function updateTask(req, res, next) {
    try{
        const taskId = req.params.id
        const getTaskUpdate = await taskSchema.findByIdAndUpdate(taskId , req.body , {new:true});
        if(!getTaskUpdate){
            return res.status(400).json({message:"Task not found"})
        };
        return res.status(200).json({message:"Task updated successfully..." , task:getTaskUpdate})
    }catch(err){
        return res.status(500).json({message:err.message}) 
    }
}

export async function deleteTask(req , res) {

    try{
        const taskId = req.params.id
        const deleteTask = await taskSchema.findByIdAndDelete(taskId , req.body);
        if(!deleteTask){
            return res.status(400).json({message:"Task not found"})
        }
        return res.status(200).json({message :"Task deleted successfully..." , deletedTask : deleteTask});
    }catch(err){
        return res.status(500).json({message:err.message}) 
    }
    
}
