const { getAllMessages, addMessages } = require("../controllers/messageController");

const router=require("express").Router();

router.post("/getmsg",getAllMessages);
router.post("/addmsg/",addMessages);

module.exports=router;