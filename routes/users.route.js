import { getCurrentUser, login, register } from "../controllers/users.controller.js";
import { protect } from "../middlewares/verifyToken.js";
import { getTasks } from "../controllers/tasks.controller.js";


export function userRoutes(app){

    app.post('/api/createuser' , register);

    app.post('/api/loginuser' , login);

    app.get('/api/getuser' , protect , getCurrentUser)

}
