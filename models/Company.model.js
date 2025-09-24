import mongoose from "mongoose";


const Companies = new mongoose.Schema({
    companyname: {
        type: String,
    },
    companyDescription: {
        type: String
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tasks",
    },]
});

const Company = mongoose.model("companies", Companies);
export default Company;
