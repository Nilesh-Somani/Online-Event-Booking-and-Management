// server/src/routes/category.routes.js

import express from "express";
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} from "../controllers/category.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";

const router = express.Router();

/**
 * =========================
 * Public Routes
 * =========================
 */

// Get all categories
router.get("/", getAllCategories);

// Get single category by ID
router.get("/:id", getCategoryById);

/**
 * =========================
 * Admin Routes
 * =========================
 */

// Create category
router.post("/", protect, adminOnly, createCategory);

// Update category
router.put("/:id", protect, adminOnly, updateCategory);

// Delete category
router.delete("/:id", protect, adminOnly, deleteCategory);

export default router;