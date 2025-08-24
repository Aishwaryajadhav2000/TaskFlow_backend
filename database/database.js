import mongoose from "mongoose";

export async function connectDatabase() {
    try{
        await mongoose.connect("mongodb+srv://aishwaryaj1608:zKuEIeVxn7H9XmBZ@tasks.pby542d.mongodb.net/")
    }catch(err){
        console.log("error occures" , err.message)
    }
}

export default connectDatabase;
