import { createTask, deleteTask, getTaskById, updateTask } from "../controllers/tasks.controller.js";
import { protect } from "../middlewares/verifyToken.js";

export function tasksRoute(app){
    app.post("/api/createtask" , protect ,  createTask);

    app.get("/api/gettask/:id" , getTaskById)

    app.put("/api/updatetask/:id", updateTask);

    app.delete("/api/deletetask/:id", deleteTask)

}