import express from "express";
import { uploadImage, deleteImage } from "../controllers/upload.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

/**
 * Upload single image
 * Organizer only
 */
router.post(
    "/image",
    protect,
    authorize("organizer"),
    upload.single("image"),
    uploadImage
);

router.delete(
    "/image",
    protect,
    authorize("organizer"),
    deleteImage
);

export default router;