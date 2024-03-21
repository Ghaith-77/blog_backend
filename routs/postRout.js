const expressAsyncHandler = require("express-async-handler");
const {
  postModel,
  validationcreatepost,
  validationPutpost,
} = require("../mudels/postModel"); // تصحيح في اسم المجلد models
const bcrypt = require("bcryptjs"); // تصحيح في استدعاء مكتبة bcrypt
const router = require("express").Router(); // تصحيح في استدعاء الدالة Router()
let path = require("path");
const { aploudtoCloud } = require("../medelweres/cloudenry");

let fs = require("fs");
const { verfiyToken } = require("../medelweres/tokenmedelweres");
let storage = require("../medelweres/uploudImg")
router.post(
  "/createPost",verfiyToken,storage.single("img"),
  expressAsyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "not file provied" });
    }

    let { error } = validationcreatepost(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message }); // استخدام return للخروج من الدالة
    }


    let pathimg = path.join(__dirname, `../images/${req.file.filename}`);

    let result = await aploudtoCloud(pathimg);

    let post = await postModel.create({
      title: req.body.title,
      description: req.body.description,
      caticory: req.body.caticory,
      user: req.user.id,
      image: {
        url: result.secure_url,
        publicId: result.public_id,
      }
    });

    res.status(200).json(post)

    fs.unlinkSync(pathimg)
    
  })
);

module.exports = router; // تصحيح في تصدير الراوتر
