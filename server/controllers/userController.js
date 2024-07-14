const { json } = require("express");
const User =require("../models/userModel");
const bcrypt=require("bcryptjs");

module.exports.register=async (req,res,next)=>{
    try {
        const {username,password,email}=req.body;
        const usernameCheck= await (User.findOne({username}));
        if(usernameCheck){
            return res.json({msg:"User already Exists",status:false});
        }
        const emailCheck= await (User.findOne({email}));
        if(emailCheck){
            return res.json({msg:"User already Exists",status:false});
        }
        const hashPassword=await bcrypt.hash(password,10);
        const user=await User.create({
            username,
            email,
            password:hashPassword,
        })
        delete user.password;
        return res.json({user,status:true});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Error", status:false});
    }
};

module.exports.login=async (req,res,next)=>{
    try {
        const {username,password}=req.body;
        const user= await (User.findOne({username}));
        if(!user){
            return res.json({msg:"Incorrect Username or Password",status:false});
        }
        console.log(`${user} is found`);
        const passwordValid= await (bcrypt.compare(password,user.password));
        if(!passwordValid){
            return res.json({msg:"Incorrect Username or Password",status:false});
        }
        delete user.password;
        return res.json({user,status:true});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Error", status:false});
    }
};


module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.images; // Ensure this matches the key sent from the client
        const userData = await User.findByIdAndUpdate(
            userId,
            {
                isAvatarImageSet: true,
                avatarImage,
            },
            { new: true }
        );
        if (!userData) {
            return res.status(404).json({ message: "User not found", status: false });
        }
        return res.json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Error", status: false });
    }
};

module.exports.getAllUsers = async (req, res, next) =>{
  try {
    const userId=req.params.id;
    const userData = await User.find({_id:{$ne:userId}}).select(
        [
            "username",
            "email",
            "avatarImage",
            "_id"
        ]
    );
    return res.json(userData);
  } catch (error) {
    next(error);
  }  
};