import express from "express";
import { approveEvent } from "../controllers/admin.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();
router.put("/events/:id/approve", protect, authorize("admin"), approveEvent);

export default router;