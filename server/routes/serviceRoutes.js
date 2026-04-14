import express from "express";
import serviceController from "../controllers/serviceController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
const router = express.Router();

// Create a new service
router.post("/", protect, adminOnly, serviceController.createService);
// Get all services
router.get("/", serviceController.getAllServices);
// Get a single service by ID
router.get("/:id", serviceController.getServiceById);
// Update a service by ID
router.put("/:id", protect, adminOnly, serviceController.updateService);
// Delete a service by ID
router.delete("/:id", protect, adminOnly, serviceController.deleteService);
export default router;
