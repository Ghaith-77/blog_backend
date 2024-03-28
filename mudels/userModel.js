const mongoose = require("mongoose");
const joi = require("joi");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    profilePhoto: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        publicId: null,
      },
    },
    bio: {
      type: String,
    },
  },
  { timestamps: true,  toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.virtual("posts", {
  ref: "post",
  foreignField: "user",
  localField: "_id",
});

const userModel = mongoose.model("user", userSchema);

function validationRegister(obj) {
  const schema = joi.object({
    username: joi.string().trim().required(),
    email: joi.string().trim().required(),
    password: joi.string().trim().required(),
  });
  return schema.validate(obj);
}
function validationPut(obj) {
  const schema = joi.object({
    username: joi.string().trim(),
    password: joi.string().trim(),
    bio: joi.string().trim(),
  });
  return schema.validate(obj);
}
function validationLogin(obj) {
  const schema = joi.object({
    email: joi.string().trim().required(),
    password: joi.string().trim().required(),
  });
  return schema.validate(obj);
}

module.exports = {
  userModel,
  validationRegister,
  validationLogin,
  validationPut,
};
