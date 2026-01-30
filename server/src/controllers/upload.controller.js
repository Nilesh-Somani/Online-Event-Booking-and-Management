import cloudinary from "../config/cloudinary.js";

/**
 * =========================================================
 * UPLOAD IMAGE TO CLOUDINARY
 * Organizer only
 * =========================================================
 */
export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image file provided" });
        }

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: req.query.folder || "events",
                    resource_type: "image",
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(req.file.buffer);
        });

        res.status(201).json({
            message: "Image uploaded successfully",
            image: {
                url: uploadResult.secure_url,
                publicId: uploadResult.public_id,
            },
        });
    } catch (error) {
        console.error("CLOUDINARY ERROR:", error); // 👈 ADD THIS

        res.status(500).json({
            message: "Image upload failed",
            error: error?.message || error,
        });
    }
};

/**
 * =========================================================
 * DELETE IMAGE FROM CLOUDINARY
 * =========================================================
 */
export const deleteImage = async (req, res) => {
    try {
        const { publicId } = req.body;

        if (!publicId) {
            return res.status(400).json({ message: "publicId is required" });
        }

        await cloudinary.uploader.destroy(publicId);

        res.json({ message: "Image deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete image",
            error: error.message,
        });
    }
};