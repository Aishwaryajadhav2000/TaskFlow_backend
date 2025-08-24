import mongoose from "mongoose";

export async function connectDatabase() {
    try{
        await mongoose.connect("mongodb://localhost:27017/task_flow")
    }catch(err){
        console.log("error occures" , err.message)
    }
}

export default connectDatabase;
