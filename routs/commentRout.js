const expressAsyncHandler = require("express-async-handler");
const {
  commentModel,
  validationcreateComment,
  validationPutComment,
} = require("../mudels/commentModel"); // تصحيح في اسم المجلد models
const router = require("express").Router(); // تصحيح في استدعاء الدالة Router()
const {
  verfiyToken,
  verfiyTokenandAdmin,
} = require("../medelweres/tokenmedelweres");
const validateObjectId = require("../medelweres/validateObjectId");
const { userModel } = require("../mudels/userModel");

router.post(
  "/CreatComment",
  verfiyToken,
  expressAsyncHandler(async (req, res) => {
    let { error } = validationcreateComment(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message }); // استخدام return للخروج من الدالة
    }
    let profile = await userModel.findById(req.user.id);

    let post = await commentModel.create({
      text: req.body.text,
      user: req.user.id,
      username: profile.username,
      postId: req.body.postId,
    });

    res.status(200).json(post);
  })
);
router.get(
  "/getAllComment",
  verfiyTokenandAdmin,
  expressAsyncHandler(async (req, res) => {
    let comments = await commentModel.find().populate("user", ["-password"]);
    res.status(200).json(comments);
  })
);
router.delete(
  "/deleteComment/:id",
  validateObjectId,
  verfiyToken,
  expressAsyncHandler(async (req, res) => {
    let comment = await commentModel.findById(req.params.id);
    if (!comment) {
      return res.status(400).json({ message: "comment not found " });
    }
    if (req.user.isAdmin || req.user.id == comment.user.toString()) {
      console.log("1");
      await commentModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "comment deleted " });
    }
    console.log("2");

    return res.status(400).json({ message: "not authorized" });
  })
);

router.put(
  "/updateComment/:id",
  verfiyToken,
  validateObjectId,
  expressAsyncHandler(async (req, res) => {
    let { error } = validationPutComment(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    let comment = await commentModel.findById(req.params.id);

    if (req.user.id !== comment.user.toString()) {
      console.log("1");
      return res.status(400).json({ message: "not authorized" });
    }else{
    console.log("2");

      let newComment = await commentModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
          },
        },
        { new: true }
      );
  
      res.status(200).json(newComment);
    }

  
  })
);
module.exports = router; // تصحيح في تصدير الراوتر
