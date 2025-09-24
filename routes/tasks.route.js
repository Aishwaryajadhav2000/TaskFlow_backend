import { createTask, deleteTask, findTaskByUser, getTaskById, updateTask } from "../controllers/tasks.controller.js";
import { protect } from "../middlewares/verifyToken.js";
import { upload } from "../upload/upload.js";

export function tasksRoute(app){
    app.post("/api/createtask" , protect , upload.single("taskImage") , createTask);

    app.get("/api/gettask/:id" , getTaskById)

    app.put("/api/updatetask/:id", upload.single("taskImage"), updateTask);

    app.delete("/api/deletetask/:id", deleteTask);

    app.post("/api/findtaskbyuser" , findTaskByUser);

}