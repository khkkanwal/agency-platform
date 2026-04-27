import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero1.avif";

function Hero() {
  return (
    <div className="grid md:grid-cols-2 gap-10 px-4 md:px-8 py-16 items-center">
      {/* LEFT */}
      <div>
        <p className="text-green-500 font-semibold uppercase tracking-wide">
          Digital Marketing Agency
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
          Grow Your Business with Smart Digital Solutions
        </h1>

        <p className="text-gray-500 mt-4 max-w-md">
          We help businesses boost their online presence through SEO, social
          media marketing, branding, and modern web solutions. Let’s turn your
          ideas into real growth.
        </p>

        {/* CTA BUTTONS */}
        <div className="mt-6 flex flex-wrap gap-4">
          <Link to="/booking">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded transition">
              Book Appointment
            </button>
          </Link>

          <Link to="/services">
            <button className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-6 py-3 rounded transition">
              Our Services
            </button>
          </Link>
        </div>

        {/* TRUST LINE */}
        <p className="text-sm text-gray-400 mt-4">
          Trusted by businesses for digital growth & branding
        </p>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative">
        <img
          src={heroImage} // ✅ FIXED
          alt="Digital Marketing Agency"
          className="rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
}

export default Hero;
