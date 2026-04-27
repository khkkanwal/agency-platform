import React from "react";
import { FaCode, FaBullhorn, FaSearch, FaPaintBrush } from "react-icons/fa";
import portfolio1 from "../assets/portfolio1.avif";
import portfolio2 from "../assets/portfolio2.avif";
import portfolio3 from "../assets/portfolio3.avif";

function Portfolio() {
  const projects = [
    {
      title: "E-commerce Website",
      image: portfolio1,
    },
    {
      title: "Business Landing Page",
      image: portfolio2,
    },
    {
      title: "Portfolio Website",
      image: portfolio3,
    },
  ];

  return (
    <div className="px-4 md:px-8 py-16 bg-gray-50">
      {/* HEADING */}
      <div className="text-center mb-10">
        <p className="text-green-500 font-semibold">Our Work</p>
        <h2 className="text-3xl font-bold mt-2">
          Recent Projects We Delivered
        </h2>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            <img
              src={project.image}
              alt={project.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold">{project.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
