import { createTask, getTasks } from "../controllers/tasks.controller.js";
import { protect } from "../middlewares/verifyToken.js";

export function tasksRoute(app){
    app.post("/api/createtask" , protect ,  createTask);

    app.get("/api/gettasks" , getTasks)
}