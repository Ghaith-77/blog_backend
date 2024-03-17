let multer = require("multer");
let path = require("path");

let storgedisk = multer.diskStorage({
  distination: (req, file, cb) => {
    cb(null, path.join(__dirname, "images"));
  },
  filename: (req, file, cb) => {
    if (file) {
      cb(nul, new Date().toISOString().replace(/:/g, "-") + file.orignalname);
    } else {
      cb(null, false);
    }
  },
});
let storge = multer({
  Storage: storgedisk,
  limit: { fileSize: 1024 * 1024 * 2 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null,true)
    }else{
        cb({error:"type not correct"},false)
    }
  },
});

module.exports = storge