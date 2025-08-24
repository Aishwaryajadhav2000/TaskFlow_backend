// import express from "express";
import { userRoutes } from "./routes/users.route.js";
// import connectDatabase from "./database/database.js";
// import cors from "cors"
import { tasksRoute } from "./routes/tasks.route.js";
// import dotenv from "dotenv";
import cors from 'cors';
import express from 'express';
const app = express();
import mongoose from 'mongoose';


// const app = express();
// app.use(express.json());

// connectDatabase()

// dotenv.config();
// //Server running on port 8000
// const PORT = process.env.PORT || 8000;

// app.listen(PORT, () => {
//     console.log(`server running at ${PORT}`)
// });

// const allowedOrigins = [
//      "http://localhost:5173"
// ]
// app.use(cors({
//     origin : allowedOrigins
// }))

// app.get('/' , (req,res)=>{
//     res.send("welcome to root route")
// })


// //Routes
// // app.use('/api' , userRoutes);
// userRoutes(app);
// tasksRoute(app);


// // MiddleWare
// // For invalid routing
// app.use((req, res) => {
//     res.status(502).json({
//         error: "Invalid routing",
//         message: `The requested URL ( ${req.originalUrl} ) not found on this server.. Please Enter valid URL.`
//     })
// })

// //  middleware => Error-handling
// app.use((err, req, res, next) => {
//     if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
//         return res.status(417).json({
//             error: "Invalid JSON",
//             message: "Please check your request body. Make sure JSON is properly formatted."
//         });
//     }
//     next(err); // Pass to default error handler if not a JSON error
// });











mongoose.connect('mongodb+srv://aishwaryaj1608:zKuEIeVxn7H9XmBZ@tasks.pby542d.mongodb.net/')
.then(()=>{
    console.log("DB CONNECTED SUCCESSFULLY");
})
.catch((err)=>{
    console.log(err , "err while connecting DB");
});


app.use(cors()) // cors middleware
app.use(express.json()) //body parsing middleware

app.use((req,res,next)=>{
    console.log("middleware hu mai");
    next();
})

app.get('/' , (req,res)=>{
    res.send("welcome to root route")
})

userRoutes(app);
tasksRoute(app);

const PORT = 8000;
app.listen(PORT , ()=>{
    console.log(`SERVER CONNECTED AT PORT: ${PORT}`);
})







