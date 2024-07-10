const express=require('express');
const cors=require("cors");
const mongoose=require("mongoose");
const userRoutes=require("./routes/userRoute")
require("dotenv").config();

const app=express();

app.use(cors());

app.use(express.json())

app.use("/api/auth",userRoutes);
const mongoURI=process.env.MONGO_URL;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));



const server = app.listen(process.env.PORT,()=>{
    console.log(`Listening on PORT ${process.env.PORT}`)
})

