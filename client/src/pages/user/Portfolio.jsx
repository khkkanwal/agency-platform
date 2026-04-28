import React, { useEffect, useState } from "react";
import axios from "axios";
import { TopBar, Navbar, Footer } from "../../components";
function Portfolio() {
  const API_URL = "http://localhost:5000/api/portfolio";

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setProjects(res.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <TopBar />
      <Navbar />
      <div className="px-4 md:px-8 py-12">
        <h1 className="text-3xl font-bold text-center mb-10">Our Portfolio</h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : projects.length === 0 ? (
          <p className="text-center">No projects found</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div
                key={p._id}
                className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-48 w-full object-cover"
                />

                <div className="p-4">
                  <h2 className="font-bold text-lg">{p.title}</h2>

                  <p className="text-gray-500 text-sm mt-2">
                    {p.description?.slice(0, 80)}...
                  </p>

                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-600 text-sm mt-3 inline-block"
                  >
                    View Project →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Portfolio;
