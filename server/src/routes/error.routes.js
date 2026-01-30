import express from "express";
import { getErrors, resolveError } from "../controllers/error.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, authorize("admin"), getErrors);
router.patch("/:id/resolve", protect, authorize("admin"), resolveError);

export default router;