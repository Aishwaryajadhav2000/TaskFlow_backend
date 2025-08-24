import { createTask } from "../controllers/tasks.controller.js";

export function tasksRoute(app){
    app.post("/createtask" , createTask)
}