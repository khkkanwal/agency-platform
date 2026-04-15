import express from "express";
import portfolioController from "../controllers/portfolioController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new portfolio item
router.post("/", protect, portfolioController.createPortfolio);
// Get all portfolio items
router.get("/", portfolioController.getAllPortfolios);
// Get a single portfolio item by ID
router.get("/:id", portfolioController.getPortfolioById);
// Update a portfolio item by ID
router.put("/:id", protect, portfolioController.updatePortfolio);
// Delete a portfolio item by ID
router.delete("/:id", protect, portfolioController.deletePortfolio);
export default router;
