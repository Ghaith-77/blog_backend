const expressAsyncHandler = require("express-async-handler");
const { userModel, validationRegister, validationLogin } = require("../../mudels/userModel"); // تصحيح في اسم المجلد models
const bcrypt = require("bcryptjs"); // تصحيح في استدعاء مكتبة bcrypt
const router = require("express").Router(); // تصحيح في استدعاء الدالة Router()
let jwt = require("jsonwebtoken")

router.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    let { error } = validationRegister(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message }); // استخدام return للخروج من الدالة
    }
    let user = await userModel.findOne({ email: req.body.email });
    if (user) {
      return res.status(401).json({ message: "User already exists" }); // تصحيح في رسالة الخطأ
    }
    let salt = await bcrypt.genSalt(10);
    let hashedpassword = await bcrypt.hash(req.body.password, salt); // استخدام await للانتظار حتى الانتهاء من التشفير
    user = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedpassword
    });
    await user.save();

    res.status(200).json({ message: "You are registered" }); // تصحيح في رسالة النجاح
  })
);
router.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    let { error } = validationLogin(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message }); // استخدام return للخروج من الدالة
    }
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "User not  exists" }); // تصحيح في رسالة الخطأ
    }

    let ispasswordMatch = await bcrypt.compare(req.body.password, user.password)

    if (!ispasswordMatch) {
      return res.status(401).json({ message: "password not correct" }); // تصحيح في رسالة الخطأ
    }

    let token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.secretkey)
    res.status(200).json({
      id: user.id,
      isAdmin: user.isAdmin,
      profilePhoto: user.profilePhoto,
      token
    }); // تصحيح في رسالة النجاح
  })
);
module.exports = router; // تصحيح في تصدير الراوتر
