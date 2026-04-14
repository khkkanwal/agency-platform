import Inquiry from "../models/InquiryModel.js";

const inquiryController = {};

// Create a new inquiry
inquiryController.createInquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newInquiry = new Inquiry({ name, email, message });
    const savedInquiry = await newInquiry.save();
    res.status(201).json(savedInquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all inquiries
inquiryController.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single inquiry by ID
inquiryController.getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    res.status(200).json(inquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an inquiry by ID
inquiryController.updateInquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { name, email, message },
      { new: true },
    );
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    res.status(200).json(inquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an inquiry by ID
inquiryController.deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    res.status(200).json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default inquiryController;
