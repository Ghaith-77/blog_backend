const mongoose = require("mongoose");
const joi = require("joi");

const catigorySchema = mongoose.Schema(
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
      trim:true
    }
   
  },
  { timestamps: true }
);

const CatigoryModel = mongoose.model("Catigory", catigorySchema);

function validationcreateCatigory(obj) {
  const schema = joi.object({
    title: joi.string().trim().required(),
  });
  return schema.validate(obj);
}


module.exports = {
    CatigoryModel,
    validationcreateCatigory,
};
