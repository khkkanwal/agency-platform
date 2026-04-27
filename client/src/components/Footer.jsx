import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <div className="bg-gray-900 text-gray-300 px-4 md:px-8 pt-12 pb-6">
      {/* TOP */}
      <div className="grid md:grid-cols-4 gap-8">
        {/* LOGO + ABOUT */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="logo" className="h-10 w-10" />
            <h2 className="text-white font-bold text-lg">DevelopersHub</h2>
          </div>

          <p className="text-sm">
            We provide digital solutions including web development, SEO, and
            branding to help your business grow online.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-white font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>Web Development</li>
            <li>SEO Optimization</li>
            <li>Digital Marketing</li>
            <li>Branding</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>

          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <FaPhoneAlt /> (000) 000-0000
            </p>

            <p className="flex items-center gap-2">
              <FaEnvelope /> example@gmail.com
            </p>
          </div>

          {/* SOCIAL */}
          <div className="flex gap-3 mt-4">
            <Link
              to="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="cursor-pointer hover:text-white" />
            </Link>
            <Link
              to="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="cursor-pointer hover:text-white" />
            </Link>
            <Link
              to="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="cursor-pointer hover:text-white" />
            </Link>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm">
        © {new Date().getFullYear()} DevelopersHub Corporation. All rights
        reserved.
      </div>
    </div>
  );
}

export default Footer;
