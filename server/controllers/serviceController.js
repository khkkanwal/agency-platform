import Service from "../models/ServiceModel.js";

const serviceController = {};
// Create a new service
serviceController.createService = async (req, res) => {
  try {
    const { title, description, price, imageUrl } = req.body;
    if (!title || !description || !price || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newService = new Service({
      title,
      description,
      price,
      imageUrl,
    });
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all services
serviceController.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get a single service by ID
serviceController.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update a service by ID
serviceController.updateService = async (req, res) => {
  try {
    const { title, description, price, imageUrl } = req.body;
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { title, description, price, imageUrl },
      { new: true },
    );
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Delete a service by ID
serviceController.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export default serviceController;
