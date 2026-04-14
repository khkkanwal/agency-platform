import Portfolio from "../models/PortfolioModel.js";

const portfolioController = {};

// Create a new portfolio item
portfolioController.createPortfolio = async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;
    const newPortfolio = new Portfolio({ title, description, imageUrl });
    const savedPortfolio = await newPortfolio.save();
    res.status(201).json(savedPortfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all portfolio items
portfolioController.getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.status(200).json(portfolios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get a single portfolio item by ID
portfolioController.getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio item not found" });
    }
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
portfolioController.updatePortfolio = async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;
    const portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      { title, description, imageUrl },
      { new: true },
    );
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio item not found" });
    }
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
portfolioController.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio item not found" });
    }
    res.status(200).json({ message: "Portfolio item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export default portfolioController;
