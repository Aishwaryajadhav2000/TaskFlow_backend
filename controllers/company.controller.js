import Company from "../models/Company.model.js";
import taskSchema from "../models/Tasks.model.js";
import usersSchema from "../models/Users.model.js";


export async function getUsersByCompanyName(req, res, next) {
    try {
        const { companyname } = req.params;

        const getUsers = await Company.findOne({ companyname }).populate("users");

        if (!getUsers) {
            return res.status(500).json({ message: "Company not found" })
        }

        return res.status(200).json({ users: getUsers.users })

    } catch (err) {
        return res.status(500).json({ mesaage: err })
    }
}

export async function createCompany(req, res) {
    try {

        const {companyname , companyDescription} = req.body;

        const findCompany = await Company.findOne({companyname});
        if(findCompany){
            return res.status(500).json({message : "Company already exist. enter new name"})
        }else{

            const newCompany = new Company({companyname , companyDescription});

            await newCompany.save();

            return res.status(200).json({message : "new data created sucsessfully..." , company : newCompany})
        }

    } catch (err) {
        return res.status(500).json({ mesaage: err })
    }
}


export async function getComapnies(req, res) {

    try{

        const getCompaniesList = await Company.find().populate("users").populate("tasks");
        if(!getCompaniesList || getCompaniesList.length <= 0){
            return res.status(500).json({message : "No companies found"})
        }else{
          return  res.status(200).json({companies : getCompaniesList})
        }

    }catch(err){
        return res.status(500).json({ mesaage: err })
    }   
}


//Get company details via company name
export async function getCompanyDeatils(req , res) {

    try{

        const {companyname} = req.params

        const companyDetails = await Company.findOne({companyname});

        if(!companyDetails){
            return res.status(404).json({message : `${companyname} Company not found`})
        }else{
            return res.status(200).json({details : companyDetails})
        }


    }catch(err){
     return res.status(500).json({ message: "Error occureds" })   
    }
    
}


//Delete Client via companyname 
//Delete all users present in client company
//Delete all tasks
export async function deleteClient(req , res) {
    try{

        const {companyname} = req.params

        const findClientDetails = await Company.findOne({companyname});

        if(!findClientDetails){
            return res.status(404).json({message : `${companyname} Company not found`})
        }else{

            //get userslist from client detailsw and delete
           const getUsersAndDelete = findClientDetails.users
           if(getUsersAndDelete.length > 0){
            await usersSchema.deleteMany({_id : {$in : getUsersAndDelete}})
           }

           //get tasks from client details and delete
           const getTasks = findClientDetails.tasks
           if(getTasks.length > 0){
            await taskSchema.deleteMany({_id : {$in :getTasks}})
           }

           //Delete Client company details
           await Company.findOneAndDelete({companyname})

           return res.status(200).json({message : "Client details and users deleted successfully" , deletedUsers : getUsersAndDelete.length})

        }

    }catch(err){
        return res.status(500).json({error:err})
    }
}
