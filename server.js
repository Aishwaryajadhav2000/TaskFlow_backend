import mongoose from "mongoose";
import express from "express";
import cor from "cors";



const app = new express();
app.use(express.json());

const PORT = 8000
app.listen(PORT , ()=>{
    console.log(`SERVER CONNECTED AT PORT: ${PORT}`);
});

app.get('/' , (req,res)=>{
    res.send("welcome to root route 2")
})

