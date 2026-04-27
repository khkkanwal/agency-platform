import React from "react";
import { FaCode, FaBullhorn, FaSearch, FaPaintBrush } from "react-icons/fa";

function ServiceCard() {
  const services = [
    {
      icon: <FaCode />,
      title: "Web Development",
      desc: "Modern and responsive websites tailored to your business needs.",
    },
    {
      icon: <FaBullhorn />,
      title: "Digital Marketing",
      desc: "Grow your audience with targeted marketing strategies.",
    },
    {
      icon: <FaSearch />,
      title: "SEO Optimization",
      desc: "Improve your search ranking and visibility on Google.",
    },
    {
      icon: <FaPaintBrush />,
      title: "Branding & Design",
      desc: "Create a strong and professional brand identity.",
    },
  ];

  return (
    <div className="px-6 md:px-10 py-16 bg-gray-50">
      {/* HEADING */}
      <div className="text-center mb-10">
        <p className="text-green-500 font-semibold uppercase">Our Services</p>
        <h2 className="text-3xl md:text-4xl font-bold mt-2">What We Offer</h2>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          We provide complete digital solutions to help your business grow
          online.
        </p>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="text-green-500 text-3xl mb-4">{s.icon}</div>

            <h3 className="font-semibold text-lg">{s.title}</h3>

            <p className="text-gray-500 text-sm mt-2">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceCard;
