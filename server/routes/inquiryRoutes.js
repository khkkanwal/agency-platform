import express from "express";
import inquiryController from "../controllers/inquiryController.js";

const router = express.Router();
// Create a new inquiry
router.post("/", inquiryController.createInquiry);
// Get all inquiries
router.get("/", inquiryController.getAllInquiries);
// Get a single inquiry by ID
router.get("/:id", inquiryController.getInquiryById);
// Update an inquiry by ID
router.put("/:id", inquiryController.updateInquiry);
// Delete an inquiry by ID
router.delete("/:id", inquiryController.deleteInquiry);
export default router;
