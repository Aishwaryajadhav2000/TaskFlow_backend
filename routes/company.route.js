import { createCompany, getComapnies, getUsersByCompanyName } from "../controllers/company.controller.js";


export function companyRoutes(app){
    app.get("/api/getusersbycompanyname/:companyname" , getUsersByCompanyName);

    app.post('/api/createcompany' , createCompany);

    app.get('/api/getcompanies' , getComapnies)
}
