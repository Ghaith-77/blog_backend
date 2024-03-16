const { userModel, validationPut } = require("../../mudels/userModel"); // تصحيح في اسم المجلد models
const expressAsyncHandler = require("express-async-handler");
const {verfiyTokenandAdmin,verfiyTokenandHimSelf, verfiyToken} = require("../../medelweres/tokenmedelweres");
const validateObjectId = require("../../medelweres/validateObjectId");
const router = require("express").Router(); // تصحيح في استدعاء الدالة Router()
const bcrypt = require("bcryptjs"); // تصحيح في استدعاء مكتبة bcrypt


router.get("/getAllUsers", verfiyTokenandAdmin, expressAsyncHandler(async (req, res) => {
    let users = await userModel.find().select("-password")
    res.status(200).json(users)
}))
router.get("/getUser/:id", validateObjectId, expressAsyncHandler(async (req, res) => {
    let user = await userModel.findById(req.params.id).select("-password")
    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }
    res.status(200).json(user)
}))
router.put("/updateUser/:id", validateObjectId,verfiyTokenandHimSelf, expressAsyncHandler(async (req, res) => {
    let { error } = validationPut(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message }); // استخدام return للخروج من الدالة
    }
     if(req.body.password){
        let salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password,salt)
     }
     
    let newuser = await userModel.findByIdAndUpdate(req.params.id,{
        $set:{
            username : req.body.username,
            password : req.body.password,
            bio : req.body.bio
        }
    },{new : true}).select("-password")

    
    res.status(200).json(newuser)
}))

router.post("/uploudImg",verfiyToken,(req,res)=>{
    if(!req.file){
        return res.status(400).json({message : "not file provied"})
    }
    return res.status(200).json({message : "img uplouded"})
})

module.exports = router; // تصحيح في تصدير الراوتر
