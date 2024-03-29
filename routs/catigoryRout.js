const expressAsyncHandler = require("express-async-handler");
const {
  CatigoryModell,
  validationcreateCatigory,
} = require("../mudels/catigoryModel"); // تصحيح في اسم المجلد models
const bcrypt = require("bcryptjs"); // تصحيح في استدعاء مكتبة bcrypt
const router = require("express").Router(); // تصحيح في استدعاء الدالة Router()
const {
  verfiyToken,
  verfiyTokenandAdmin,
} = require("../medelweres/tokenmedelweres");
const { isValidObjectId } = require("mongoose");
const validateObjectId = require("../medelweres/validateObjectId");

router.post(
  "/CreateCatigory",
  verfiyTokenandAdmin,
  expressAsyncHandler(async (req, res) => {
    let { error } = validationcreateCatigory(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message }); // استخدام return للخروج من الدالة
    }

    let catigory = await CatigoryModell.create({
      title: req.body.title,
      user: req.user.id,
    });

    res.status(200).json(catigory);
  })
);

router.get(
  "/getAllCatigory",
  expressAsyncHandler(async (req, res) => {
    ddd
    let Catigorys = await CatigoryModell.find();
    res.status(200).json(Catigorys);
  })
);
router.delete(
  "/deleteCatigory/:id",validateObjectId,verfiyTokenandAdmin,
  expressAsyncHandler(async (req, res) => {
    let Catigory = await CatigoryModell.findById(req.params.id);
    if (!Catigory) {
      return res.status(400).json({ message: " not found" });
    }
    await CatigoryModell.findByIdAndDelete(req.params.id)
    res.status(200).json({message : "catigory deleted"});
  })
);

module.exports = router; // تصحيح في تصدير الراوتر
