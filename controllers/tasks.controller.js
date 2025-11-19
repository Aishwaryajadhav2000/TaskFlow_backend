import Company from "../models/Company.model.js";
import taskSchema from "../models/Tasks.model.js";
import usersSchema from "../models/Users.model.js";
import { v4 as uuidv4 } from "uuid";


export async function createTask(req, res, next) {
    try {
        const { description, taskAssign, taskStatus } = req.body;
        const userId = req.user._id
        const taskImage = req.file ? `uploads/${req.file.filename}` : null;
        const newTask = new taskSchema({
            taskId: uuidv4(),
            description, taskAssign, taskStatus, owner: userId, taskImage
        });
        const newTaskCreated = await newTask.save();

        const creator = await usersSchema.findById(userId);
        creator.tasks.push(newTaskCreated._id);
        await creator.save();

        const assignedUser = await usersSchema.findOne({ fullname: taskAssign });
        if (!assignedUser) {
            return res.status(400).json({ message: "USer not found" })
        }
        assignedUser.tasks.push(newTaskCreated._id);
        await assignedUser.save();

        let addTaskinCompanyData = await Company.findOne({ users: userId });
        if (addTaskinCompanyData) {
            addTaskinCompanyData.tasks.push(newTaskCreated._id);
            await addTaskinCompanyData.save();
        }

        return res.status(200).json({ message: "task created..", task: newTaskCreated })

    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

export async function getTaskById(req, res, next) {
    try {
        const taskId = req.params.id;
        const getTask = await taskSchema.findById(taskId);

        if (!getTask) {
            return res.status(400).json({ message: "Task not found" })
        }

        return res.status(200).json({ task: getTask })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

// export async function updateTask(req, res, next) {
//     try{
//         const taskId = req.params.id
//         const getTaskUpdate = await taskSchema.findByIdAndUpdate(taskId , req.body , {new:true});
//         if(!getTaskUpdate){
//             return res.status(400).json({message:"Task not found"})
//         };
//         return res.status(200).json({message:"Task updated successfully..." , task:getTaskUpdate})
//     }catch(err){
//         return res.status(500).json({message:err.message}) 
//     }
// }

export async function updateTask(req, res, next) {
    try {
        const taskId = req.params.id
        const { taskAssign } = req.body;

        const existingTask = await taskSchema.findById(taskId);
        if (!existingTask) {
            return res.status(500).json({ message: "Task not found" });
        }
        if (req.file) {
            req.body.taskImage = `uploads/${req.file.filename}`;
        }

        if (taskAssign && taskAssign !== existingTask.taskAssign) {
            const oldUser = await usersSchema.findOne({ fullname: existingTask.taskAssign });
            const newUser = await usersSchema.findOne({ fullname: taskAssign });

            if (!newUser) {
                return res.status(500).json({ message: "User not found" });
            }

            if (oldUser) {
                oldUser.tasks = oldUser.tasks.filter((t) => t.toString() !== taskId);
                await oldUser.save();
            }

            if (!newUser.tasks.includes(taskId)) {
                newUser.tasks.push(taskId);
                await newUser.save();
            }

            existingTask.owner = existingTask.owner.filter(
                (id) => id.toString() !== oldUser?._id.toString()
            );
            if (!existingTask.owner.includes(newUser._id)) {
                existingTask.owner.push(newUser._id);
            }
        }

        const updatedTask = await taskSchema.findByIdAndUpdate(
            taskId,
            req.body,
            { new: true }
        );

        return res.status(200).json({
            message: "Task updated successfully...",
            task: updatedTask
        });

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}



export async function deleteTask(req, res) {

    try {
        const taskId = req.params.id
        const deleteTask = await taskSchema.findByIdAndDelete(taskId, req.body);
        if (!deleteTask) {
            return res.status(400).json({ message: "Task not found" })
        }
        return res.status(200).json({ message: "Task deleted successfully...", deletedTask: deleteTask });
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}

export async function findTaskByUser(req, res) {
    try {
        const { taskAssign } = req.body;
        const findTask = await taskSchema.findOne({ taskAssign: taskAssign })
        if (!findTask) {
            return res.status(400).json({ message: "User not found" })
        }
        return res.status(200).json({ message: "Task found", tasks: findTask })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}



//new func : added to find tasks by company name
export async function findTaskByCompany(req, res) {
    try {
        const {companyname} = req.params;
        const findTask = await Company.findOne({companyname}).populate({path : 'tasks' , model : 'taskSchema'});
        if(!findTask){
            return res.status(400).json({message : "Company not found"})
        }
        const tasks = await Task.find({ _id: { $in: findTask.tasks } });
        return res.status(200).json({tasks})
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
