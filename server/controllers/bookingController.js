import Booking from "../models/BookingModel.js";

const bookingController = {};

// Create a new booking
bookingController.createBooking = async (req, res) => {
  try {
    const { name, email, date } = req.body;
    const newBooking = new Booking({ name, email, date });
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bookings
bookingController.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single booking by ID
bookingController.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a booking by ID
bookingController.updateBooking = async (req, res) => {
  try {
    const { name, email, date } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { name, email, date },
      { new: true },
    );
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a booking by ID
bookingController.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default bookingController;
