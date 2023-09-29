const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");
const multer = require("multer");

// Existing routes for CRUD operations
router.get("/", imageController.getAllImages);
router.get("/:id", imageController.getImageById);
router.post("/", imageController.createImage);
router.put("/:id", imageController.updateImage);
router.delete("/:id", imageController.deleteImage);

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specifies the upload directory
  },
  filename: function (req, file, cb) {
    // Use the original file extension for the uploaded file
    const originalExtension = file.originalname.split(".").pop();
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + originalExtension);
  },
});
const upload = multer({ storage: storage });

// New route for image upload
router.post("/upload", upload.single("image"), imageController.uploadImage);

module.exports = router;
