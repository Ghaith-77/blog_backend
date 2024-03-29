const mongoose = require("mongoose");
const joi = require("joi");

const PostSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    description: {
      type: String, 
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    likes: [
      {
      type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      }
    ],
    image: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      }
    },
    caticory: {
        type: String,
        required: true,
      },

   
  },
  { timestamps: true  ,toJSON: { virtuals: true }, toObject: { virtuals: true }}
);
PostSchema.virtual("Comments", {
  ref: "Comment",
  foreignField: "postId",
  localField: "_id",
});


const postModel = mongoose.model("post", PostSchema);

function validationcreatepost(obj) {
  const schema = joi.object({
    title: joi.string().trim().required(),
    description: joi.string().trim().required(),
    caticory: joi.string().trim().required(),
  });
  return schema.validate(obj);
}
function validationPutpost(obj) {
  const schema = joi.object({
    title: joi.string().trim(),
    description: joi.string().trim(),
    caticory: joi.string().trim(),

  });
  return schema.validate(obj);
}

module.exports = {
  postModel,
  validationcreatepost,
  validationPutpost
};
