import Company from "../models/Company.model.js";


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


export async function getCompanyDeatils(req , res) {

    try{

        const {companyname} = req.body


    }catch(err){
     return res.status(500).json({ mesaage: err })   
    }
    
}
