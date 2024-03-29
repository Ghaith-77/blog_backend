const expressAsyncHandler = require("express-async-handler");
const {
  postModel,
  validationcreateCatigory,
} = require("../mudels/postModel"); // تصحيح في اسم المجلد models
const bcrypt = require("bcryptjs"); // تصحيح في استدعاء مكتبة bcrypt
const router = require("express").Router(); // تصحيح في استدعاء الدالة Router()
let path = require("path");
const { aploudtoCloud, DeletCloud } = require("../medelweres/cloudenry");

let fs = require("fs");
const {
  verfiyToken,
  verfiyTokenandAdmin,
} = require("../medelweres/tokenmedelweres");
let storage = require("../medelweres/uploudImg");
const { isValidObjectId } = require("mongoose");
const validateObjectId = require("../medelweres/validateObjectId");
const { commentModel } = require("../mudels/commentModel");
const { CatigoryModel } = require("../mudels/catigoryModel");

router.post(
  "/CreateCatigory",
  verfiyTokenandAdmin,
  expressAsyncHandler(async (req, res) => {
    let { error } = validationcreateCatigory(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message }); // استخدام return للخروج من الدالة
    }

    let catigory = await CatigoryModel.create({
      title: req.body.title,
      user: req.user.id,
    });

    res.status(200).json(catigory);
  })
);

router.get(
  "/getAllCatigory",
  expressAsyncHandler(async (req, res) => {
    let Catigorys = await CatigoryModel.find();
    res.status(200).json(Catigorys);
  })
);
router.delete(
  "/deleteCatigory/:id",validateObjectId,verfiyTokenandAdmin,
  expressAsyncHandler(async (req, res) => {
    let Catigory = await CatigoryModel.findById(req.params.id);
    if (!Catigory) {
      return res.status(400).json({ message: " not found" });
    }
    await CatigoryModel.findByIdAndDelete(req.params.id)
    res.status(200).json({message : "catigory deleted"});
  })
);

module.exports = router; // تصحيح في تصدير الراوتر
