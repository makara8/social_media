const express = require("express");
const authController = require("../controller/AuthController");
const multer = require("multer");
const PostController = require("../controller/PostController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const filename =
      file.fieldname +
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      ".jpg";
    req.body.image_path = filename;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/add-post", upload.single("image"), PostController.addPost);
router.post("/like-unlike", PostController.likeUnlike);
router.get("/get-all", PostController.getAllpost);

module.exports = router;
