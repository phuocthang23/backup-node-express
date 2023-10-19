const multer = require("multer");
const User = require("../models/user.model");
//tạo đường dẫn cho upload

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const checkUserExists = async (req, res, next) => {
  const { username } = req.body;

  const user = await User.findOne({ where: { username } });

  if (user) {
    res.status(409).json({ error: "Exited username or password." });
  } else {
    res.status(200).json({ pass: " username or password." });
    next();
  }
};

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = { upload, checkUserExists };
