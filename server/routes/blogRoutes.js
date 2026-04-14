import express from "express";
import blogController from "../controllers/blogController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new blog post
router.post("/", protect, blogController.createBlog);
// Get all blog posts
router.get("/", blogController.getAllBlogs);
// Get a single blog post by ID
router.get("/:id", blogController.getBlogById);
// Update
router.put("/:id", protect, blogController.updateBlog);
// Delete a blog post by ID
router.delete("/:id", protect, blogController.deleteBlog);
export default router;
