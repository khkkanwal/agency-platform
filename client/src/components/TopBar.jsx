import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Container from "../../Container";

function TopBar() {
  return (
    <div className="bg-green-900 text-white text-sm flex justify-between items-center px-4 md:px-8 py-2">
      {/* LEFT */}
      <div className="flex gap-4 items-center flex-wrap">
        <span className="flex items-center gap-1">
          <FaPhoneAlt /> (000) 000-0000
        </span>

        <span className="flex items-center gap-1">
          <FaEnvelope /> example@gmail.com
        </span>

        <span className="flex items-center gap-1">
          <FaMapMarkerAlt /> 2464 Royal Ln.
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex gap-3">
        <Link to="https://www.facebook.com" target="_blank">
          <FaFacebookF className="hover:text-green-300" />
        </Link>
        <Link to="https://www.instagram.com" target="_blank">
          <FaInstagram className="hover:text-green-300" />
        </Link>
        <Link to="https://www.twitter.com" target="_blank">
          <FaTwitter className="hover:text-green-300" />
        </Link>
      </div>
    </div>
  );
}

export default TopBar;
