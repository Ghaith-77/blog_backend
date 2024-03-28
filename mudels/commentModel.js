const mongoose = require("mongoose");
const joi = require("joi");

const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
    text: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("Comment", PostSchema);

function validationcreatepostComment(obj) {
  const schema = joi.object({
    title: joi.string().trim().required(),
    postId: joi.string().required(),
  });
  return schema.validate(obj);
}
function validationPutComment(obj) {
  const schema = joi.object({
    title: joi.string().trim().required(),
  });
  return schema.validate(obj);
}

module.exports = {
    commentModel,
  validationcreatepostComment,
  validationPutComment,
};
