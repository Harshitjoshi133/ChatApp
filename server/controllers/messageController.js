const messageModel =require("../models/messageModel")
module.exports.addMessages= async (req,res,next)=>{
    try {
        const {from,to,message}=req.body;
        const data= await messageModel.create({
            message:{text:message},
            user:[to,from],
            sender:from,
        }
        );
        if(data) return res.json({message:"Success"});
        return res.json({message:"failure"})
        
    
    } catch (error) {
        next(error);
    }
    
}
module.exports.getAllMessages= async (req,res,next)=>{

}