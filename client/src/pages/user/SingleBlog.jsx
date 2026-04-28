import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SingleBlog() {
  const { id } = useParams();
  const API_URL = "http://localhost:5000/api/blogs";

  const [blog, setBlog] = useState(null);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      setBlog(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (!blog) return <p className="p-6">Loading...</p>;

  return (
    <div className="px-4 md:px-10 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">{blog.title}</h1>

      <p className="text-gray-400 text-sm mt-2">
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>

      {/* TAGS */}
      <div className="flex gap-2 mt-3 flex-wrap">
        {blog.tags?.map((tag, i) => (
          <span
            key={i}
            className="bg-green-100 text-green-700 px-2 py-1 text-xs rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="mt-6 text-gray-700 leading-relaxed">{blog.content}</p>
    </div>
  );
}

export default SingleBlog;
