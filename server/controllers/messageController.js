const messageModel =require("../models/messageModel")
module.exports.addMessages= async (req,res,next)=>{
    try {
        const {from,to,message}=req.body;
        const data= await messageModel.create({
            message:{text:message},
            users:[to,from],
            sender:from,
        }
        );
        console.log(data.users.toString());
        if(data) return res.json({message:"Success"});
        return res.json({message:"failure"})
    } catch (error) {
        next(error);
    }
    
}
module.exports.getAllMessages= async (req,res,next)=>{
    try {
        const {to,from} = req.body;
        console.log(`to :${to} and from ${from}`);
        const messages=await messageModel.find({
            users: {
                $all: [to, from],
            },
    }).sort({updatedAt:1});
        const projectMessages=messages.map((msg)=>{
            return{
                fromSelf:msg.sender.toString()==from,
                message:msg.message.text,
            };
        })
        console.log(projectMessages);
        return res.json(projectMessages);
    } catch (error) {
        console.log(error)
        next(error);
    }
}