const { default: mongoose } = require("mongoose");


const taskModel = new mongoose.Schema({
    description : {
        type : String
    },
    taskAssign : {
        type : String
    },
    taskStatus : {
        type : String
    },
    owner : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "users"
    }]
});

const taskSchema =  mongoose.model("tasks" , taskModel);

export default taskSchema