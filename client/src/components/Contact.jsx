import React from "react";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <div className="bg-green-600 text-white px-4 md:px-8 py-16">
      <div className="max-w-3xl mx-auto text-center">
        {/* HEADING */}
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Grow Your Business?
        </h2>

        <p className="mt-4 text-green-100">
          Let’s work together to build something amazing. Book a meeting or
          contact us today and take your business to the next level.
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/booking">
            <button className="bg-white text-green-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition">
              Book Appointment
            </button>
          </Link>

          <Link to="/contact">
            <button className="border border-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-green-600 transition">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Contact;
