import jwt from "jsonwebtoken"
import usersSchema from "../models/Users.model.js"


export function protect(req , res, next){
    if(req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer" ){
        jwt.verify(req.headers.authorization.split(" ")[1] , 'secretKey' , 
            function(err , verifiedToken){
                if(err){
                    return res.status(402).json({message : "Invalid JWT token"})
                }
                console.log("verifiedToken" , verifiedToken);
                usersSchema.findById(verifiedToken._id)
                .then((user) =>{
                    console.log("user", user);
                    req.user = user;
                    next();;
                }).catch((err)=>{
                    return res.status(400).json({message : "Authentication failed"})
                })
            }
        )
    }else{
        return res.status(404).json({message : "token not found"})
    }
}
