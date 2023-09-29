const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");
const multer = require("multer");

// routes for crud
router.get("/", imageController.getAllImages);
router.get("/:id", imageController.getImageById);
router.post("/", imageController.createImage);
router.put("/:id", imageController.updateImage);
router.delete("/:id", imageController.deleteImage);

// multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const originalExtension = file.originalname.split(".").pop();
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + originalExtension);
  },
});
const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), imageController.uploadImage);

module.exports = router;
