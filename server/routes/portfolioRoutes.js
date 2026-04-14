import express from "express";
import serviceController from "../controllers/serviceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new portfolio item
router.post("/", protect, serviceController.createPortfolio);
// Get all portfolio items
router.get("/", serviceController.getAllPortfolios);
// Get a single portfolio item by ID
router.get("/:id", serviceController.getPortfolioById);
// Update a portfolio item by ID
router.put("/:id", protect, serviceController.updatePortfolio);
// Delete a portfolio item by ID
router.delete("/:id", protect, serviceController.deletePortfolio);
export default router;
