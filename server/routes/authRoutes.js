import express from "express";
import authController from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register a new user
router.post("/register", authController.registerUser);
// Login a user
router.post("/login", authController.loginUser);
// Logout a user
router.post("/logout", authController.logout);
// Get current user info
router.get("/me", protect, authController.getCurrentUser);

module.exports = router;
