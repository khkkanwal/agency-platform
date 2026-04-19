import Inquiry from "../models/InquiryModel.js";

const inquiryController = {};

// Create a new inquiry
inquiryController.createInquiry = async (req, res) => {
  try {
    const { user, email, message, status } = req.body;
    const newInquiry = new Inquiry({ user, email, message, status });
    const savedInquiry = await newInquiry.save();
    res.status(201).json(savedInquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all inquiries
inquiryController.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
      .populate("user", "name email") // only needed fields
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get a single inquiry by ID
inquiryController.getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id).populate("user"); // ✅ ADD THIS

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
    const { status } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
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
