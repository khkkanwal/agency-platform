import React, { useEffect, useState } from "react";
import axios from "axios";
import { TopBar, Navbar, Footer } from "../../components";

function Services() {
  const API_URL = "http://localhost:5000/api/services";

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setServices(res.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div>
      <TopBar />
      <Navbar />
      {/* HERO */}
      <div className="bg-green-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Our Services</h1>
        <p className="mt-2 text-gray-200">
          We provide high-quality digital solutions for your business
        </p>
      </div>

      {/* SERVICES GRID */}
      <div className="px-4 md:px-8 py-12 grid md:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading...</p>
        ) : services.length === 0 ? (
          <p>No services available</p>
        ) : (
          services.map((service) => (
            <div
              key={service._id}
              className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition"
            >
              {/* TITLE */}
              <h2 className="text-xl font-semibold">{service.title}</h2>

              {/* DESCRIPTION */}
              <p className="text-gray-500 mt-3">
                {service.description?.length > 120
                  ? service.description.slice(0, 120) + "..."
                  : service.description}
              </p>

              {/* PRICE (OPTIONAL) */}
              {service.price && (
                <p className="mt-3 font-semibold text-green-600">
                  ${service.price}
                </p>
              )}

              {/* CTA */}
              <button className="mt-4 text-green-600 font-semibold">
                Learn More →
              </button>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Services;
