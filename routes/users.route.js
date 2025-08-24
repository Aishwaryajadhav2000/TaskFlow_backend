import { login, register } from "../controllers/users.controller.js";


export function userRoutes(app){

    app.post('/createuser' , register);

    app.post('/loginuser' , login);

}
