import { createCompany, deleteClient, getComapnies, getCompanyDeatils, getUsersByCompanyName } from "../controllers/company.controller.js";


export function companyRoutes(app){
    app.get("/api/getusersbycompanyname/:companyname" , getUsersByCompanyName);

    app.post('/api/createcompany' , createCompany);

    app.get('/api/getcompanies' , getComapnies);

    //getCompany details
    app.get('/api/getcompany/:companyname' , getCompanyDeatils);

    app.delete('/api/deleteclient/:companyname' , deleteClient)
}
