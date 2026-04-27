import React from "react";
import { Link } from "react-router-dom";
import blog1 from "../assets/blog1.avif";
import blog2 from "../assets/blog2.avif";
import blog3 from "../assets/blog3.avif";

function Blog() {
  const blogs = [
    {
      title: "Top 5 Digital Marketing Strategies in 2025",
      content: "Discover the latest strategies to grow your business online...",
      image: blog1,
      date: "Aug 20, 2025",
    },
    {
      title: "Why Every Business Needs a Website",
      content:
        "A professional website builds trust and increases visibility...",
      image: blog2,
      date: "Aug 18, 2025",
    },
    {
      title: "SEO Tips to Rank Higher on Google",
      content: "Learn simple SEO techniques to boost your rankings...",
      image: blog3,
      date: "Aug 15, 2025",
    },
  ];

  return (
    <div className="px-4 md:px-8 py-16">
      {/* HEADING */}
      <div className="text-center mb-10">
        <p className="text-green-500 font-semibold">Our Blog</p>
        <h2 className="text-3xl font-bold mt-2">Latest Insights & Articles</h2>
      </div>

      {/* BLOG GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog, i) => (
          <div
            key={i}
            className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <p className="text-sm text-gray-400">{blog.date}</p>

              <h3 className="font-semibold mt-2">{blog.title}</h3>

              <p className="text-gray-500 text-sm mt-2">
                {blog.content.slice(0, 80)}...
              </p>

              <Link
                to="/blogs"
                className="text-green-500 text-sm mt-3 inline-block"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* VIEW ALL BUTTON */}
      <div className="text-center mt-10">
        <Link to="/blogs">
          <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
            View All Blogs
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Blog;
