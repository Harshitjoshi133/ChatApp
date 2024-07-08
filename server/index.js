const express=require('express');
const cors=require("cors");
const mongoose=require("mongoose");
require("dotenv").config();

const app=express();

app.use(cors());

app.use(express.json())

mongoose.connect(process.env.MONGO_URL,{
  
}).then(()=>{
    console.log("DB Connect with Success")
}).catch(err=()=>{
    console.log(err.message);
})



const server = app.listen(process.env.PORT,()=>{
    console.log(`Listening on PORT ${process.env.PORT}`)
})

