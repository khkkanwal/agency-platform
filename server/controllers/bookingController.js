import Booking from "../models/BookingModel.js";

const bookingController = {};

// CREATE
bookingController.createBooking = async (req, res) => {
  try {
    const { user, name, email, serviceId, date, time, status } = req.body;

    const newBooking = new Booking({
      user,
      name,
      email,
      serviceId,
      date,
      time,
      status: status || "pending",
    });

    const saved = await newBooking.save();

    const populated = await Booking.findById(saved._id)
      .populate("user", "name email")
      .populate("serviceId", "title");

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
bookingController.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("serviceId", "title")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ONE
bookingController.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user", "name email")
      .populate("serviceId", "title");

    if (!booking) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE (status only safe)
bookingController.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    )
      .populate("user", "name email")
      .populate("serviceId", "title");

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
bookingController.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default bookingController;
