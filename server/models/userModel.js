const mongoose= require("mongoose");


const userSchema =mongoose.Schema({
    username:{
        type:"string",
        required:true,
        unique:true,
        min:4,
        max:20,
    },
    email:{
        type:"string",
        required:true,
        unique:true,
        max:50,
    },
    password:{
        type:"string",
        required:true,
        min:8,
    },
    isAvatarImageSet:{
        type:"boolean",
        default:false,
    },
    avatarImage:{
        type:"string",
        default:""
    }

});

module.exports=mongoose.model("Users",userSchema);