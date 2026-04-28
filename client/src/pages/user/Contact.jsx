import React, { useState } from "react";
import axios from "axios";
import { TopBar, Navbar, Footer } from "../../components";

function Contact() {
  const API_URL = "http://localhost:5000/api/inquiries";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(API_URL, formData);
      setSuccess("Message sent successfully ✅");
      setError("");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Failed to send message");
      setSuccess("");
    }
  };

  return (
    <div>
      <TopBar />
      <Navbar />

      {/* HERO SECTION */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-8 grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT SIDE */}
          <div>
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-600 text-lg mb-6">
              We’d love to hear from you. Whether you have a question about
              features, pricing, or anything else — our team is ready to answer
              all your questions.
            </p>

            <div className="space-y-3 text-gray-700">
              <p>📞 (000) 000-0000</p>
              <p>📧 example@gmail.com</p>
              <p>📍 XYZ, Pakistan</p>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg p-6 rounded-xl"
          >
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                required
              />

              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                rows="5"
                required
              />

              <button className="bg-green-500 text-white px-4 py-3 rounded w-full hover:bg-green-600">
                Send Message
              </button>
            </div>

            {success && <p className="text-green-600 mt-3">{success}</p>}
            {error && <p className="text-red-500 mt-3">{error}</p>}
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
