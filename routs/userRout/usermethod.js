const { userModel, validationPut } = require("../../mudels/userModel"); // تصحيح في اسم المجلد models
const expressAsyncHandler = require("express-async-handler");
const { verfiyTokenandAdmin, verfiyTokenandHimSelf, verfiyToken } = require("../../medelweres/tokenmedelweres");
const validateObjectId = require("../../medelweres/validateObjectId");
const router = require("express").Router(); // تصحيح في استدعاء الدالة Router()
const bcrypt = require("bcryptjs"); // تصحيح في استدعاء مكتبة bcrypt
const storge = require("../../medelweres/uploudImg");
let path = require("path");
const { aploudtoCloud, DeletCloud } = require("../../medelweres/cloudenry");
let fs = require("fs");
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
router.put("/updateUser/:id", validateObjectId, verfiyTokenandHimSelf, expressAsyncHandler(async (req, res) => {
    let { error } = validationPut(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message }); // استخدام return للخروج من الدالة
    }
    if (req.body.password) {
        let salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
    }

    let newuser = await userModel.findByIdAndUpdate(req.params.id, {
        $set: {
            username: req.body.username,
            password: req.body.password,
            bio: req.body.bio
        }
    }, { new: true }).select("-password")


    res.status(200).json(newuser)
}))

router.post("/uploudImg", verfiyToken, storge.single("img"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "not file provied" })
    }

    let imgpath = path.join(__dirname, "images")

    let result = await aploudtoCloud(imgpath)

    let user = userModel.findById(req.body.id)

    if (user.profilePhoto.publicId != null) {
        await DeletCloud(user.profilePhoto.publicId)
    }
    user.profilePhoto = {
        url: result.secure_url,
        publicId: result.publicId
    }
    user.save()

    return res.status(200).json({
        message: "img uplouded",
        profilePhoto: {
            url: result.secure_url,
            publicId: result.publicId
        }
    }
    )

    fs.unlinkSync(imgpath)
})

module.exports = router; // تصحيح في تصدير الراوتر
