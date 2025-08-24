import taskSchema from "../models/Tasks.model.js";
import usersSchema from "../models/Users.model.js";



export async function createTask(req, res) {

    try {

        const { description, taskAssign, taskStatus } = req.body;

        const userId = req.user._id

        const newTask = new taskSchema({ description, taskAssign, taskStatus, owner });

        const newTaskCreated = await newTask.save();

        const user = await usersSchema.findById(userId);

        await user.save()

        return res.status(200).json({ message: "task created..", task: newTask })

    } catch (err) {
        return res.status(400).json({ message: "error" })
    }
}
