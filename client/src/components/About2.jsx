import React from "react";
import about1 from "../assets/about1.avif";

function About2() {
  return (
    <div className="grid md:grid-cols-2 gap-10 px-10 py-16 items-center">
      <div>
        <p className="text-green-500 font-semibold">About Us</p>

        <h2 className="text-3xl font-bold mt-2">
          Empowering Your Success with Digital Expertise
        </h2>

        <p className="text-gray-500 mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>

        {/* PROGRESS */}
        <div className="mt-6 space-y-4">
          <div>
            <p>Marketing & Business Growth</p>
            <div className="w-full bg-gray-200 h-2 rounded">
              <div className="bg-green-500 h-2 w-[85%] rounded"></div>
            </div>
          </div>

          <div>
            <p>Creativity & Innovation</p>
            <div className="w-full bg-gray-200 h-2 rounded">
              <div className="bg-green-500 h-2 w-[80%] rounded"></div>
            </div>
          </div>
        </div>

        <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded">
          About Us
        </button>
      </div>
      {/* IMAGES */}
      <div>
        <img src={about1} className="rounded mb-4" />
        {/* <img src={about2} className="rounded" /> */}
      </div>

      {/* TEXT */}
    </div>
  );
}

export default About2;
