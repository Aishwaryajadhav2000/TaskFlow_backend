import { login, register } from "../controllers/users.controller.js";


export function userRoutes(app){

    app.post('/api/createuser' , register);

    app.post('/loginuser' , login);

}
