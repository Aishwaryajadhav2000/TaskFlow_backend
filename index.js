import express from "express";
import { userRoutes } from "./routes/users.route.js";
import connectDatabase from "./database/database.js";
import cors from "cors"
import { tasksRoute } from "./routes/tasks.route.js";



const app = express();
app.use(express.json());

connectDatabase()

//Server running on port 8000
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`server running at ${PORT}`)
});

const allowedOrigins = [
     "http://localhost:5173"
]
app.use(cors({
    origin : allowedOrigins
}))


//Routes
// app.use('/api' , userRoutes);
userRoutes(app);
tasksRoute(app);


// MiddleWare
// For invalid routing
app.use((req, res) => {
    res.status(502).json({
        error: "Invalid routing",
        message: `The requested URL ( ${req.originalUrl} ) not found on this server.. Please Enter valid URL.`
    })
})

//  middleware => Error-handling
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(417).json({
            error: "Invalid JSON",
            message: "Please check your request body. Make sure JSON is properly formatted."
        });
    }
    next(err); // Pass to default error handler if not a JSON error
});