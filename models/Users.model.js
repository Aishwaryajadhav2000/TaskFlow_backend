import mongoose from "mongoose";

const users = new mongoose.Schema({
    companyname: {
        type: String
    },
    fullname : {
        type: String
    },
    username: {
        type: String
    },
    phone:{
        type : Number
    },
    gender :{
        type : String
    },
    position : {
        type : String
    },
    password : {
        type : String
    },
    tasks : [{
        type: mongoose.Schema.Types.ObjectId, 
        ref : "tasks"
    }]
})

const usersSchema = mongoose.model("users", users);
export default usersSchema;