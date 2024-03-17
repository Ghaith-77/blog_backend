const multer = require("multer");
const path = require("path");

const storageDisk = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: (req, file, cb) => {
    if (file) {
      cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname); // تصحيح في تهجئة originalname
    } else {
      cb(null, false);
    }
  },
});

const storage = multer({
  storage: storageDisk, // تصحيح في تهجئة storage
  limits: { fileSize: 1024 * 1024 }, // تصحيح في تهجئة limits
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb({ error: "Type not correct" }, false);
    }
  },
  
});

module.exports = storage;
