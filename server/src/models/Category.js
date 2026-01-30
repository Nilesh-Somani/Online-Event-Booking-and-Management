// server/src/models/Category.js

import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
            trim: true,
            unique: true,
            minlength: [2, "Category name must be at least 2 characters"],
            maxlength: [50, "Category name cannot exceed 50 characters"],
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        tags: {
            type: [String],
            default: [],
        },

        description: {
            type: String,
            trim: true,
            maxlength: [200, "Description cannot exceed 200 characters"],
            default: "",
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

/**
 * =========================
 * Indexes
 * =========================
 */
categorySchema.index({ isActive: 1 });

/**
 * =========================
 * Pre-save Middleware
 * =========================
 * Auto-generate slug from name
 */
categorySchema.pre("validate", function (next) {
    if (this.name && !this.slug) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
    }
    next();
});

const Category = mongoose.model("Category", categorySchema);

export default Category;