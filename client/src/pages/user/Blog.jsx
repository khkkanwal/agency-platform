import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { TopBar, Navbar, Footer, BlogHero } from "../../components";

function Blogs() {
  const API_URL = "http://localhost:5000/api/blogs";

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API_URL);

      // ✅ only show published blogs
      const published = res.data.filter((b) => b.status === "published");

      setBlogs(published);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <TopBar />
      <Navbar />
      <BlogHero />

      <div className="px-4 md:px-8 py-12">
        {loading ? (
          <p>Loading...</p>
        ) : blogs.length === 0 ? (
          <p>No blogs available</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {blogs.map((b) => (
              <div
                key={b._id}
                className="border rounded-lg shadow hover:shadow-lg transition p-4"
              >
                <h2 className="text-xl font-semibold">{b.title}</h2>

                <p className="text-gray-500 mt-2 text-sm">
                  {b.content?.slice(0, 100)}...
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  {new Date(b.createdAt).toLocaleDateString()}
                </p>

                {/* TAGS */}
                <div className="flex gap-2 mt-2 flex-wrap">
                  {b.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link to={`/blogs/${b._id}`}>
                  <button className="mt-4 text-green-600 font-semibold">
                    Read More →
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Blogs;
