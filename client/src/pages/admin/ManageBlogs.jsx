import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ManageBlogs() {
  const API_URL = "http://localhost:5000/api/blogs";

  const [blogs, setBlogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    content: "",
    status: "draft",
    tags: "",
  });

  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");

  // ---------------- FETCH ----------------
  const fetchBlogs = async () => {
    try {
      setListLoading(true);

      const res = await axios.get(API_URL);
      let data = res.data;

      const order = { draft: 1, published: 2 };
      data.sort((a, b) => order[a.status] - order[b.status]);

      setBlogs(data);
      setFiltered(data);
    } catch (err) {
      setError("Failed to load blogs");
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ---------------- SEARCH ----------------
  useEffect(() => {
    const lower = search.toLowerCase();

    const result = blogs.filter((b) => {
      return (
        b.title?.toLowerCase().includes(lower) ||
        b.content?.toLowerCase().includes(lower) ||
        b.status?.toLowerCase().includes(lower) ||
        b.tags?.toLowerCase().includes(lower) ||
        b.author?.name?.toLowerCase().includes(lower)
      );
    });

    setFiltered(result);
  }, [search, blogs]);

  // ---------------- INPUT ----------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------- ADD ----------------
  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        API_URL,
        {
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()), // convert to array
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setSuccess("Blog created successfully ✅");

      setForm({
        title: "",
        content: "",
        status: "draft",
        tags: "",
      });

      fetchBlogs();
    } catch (err) {
      setError(err.response?.data?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UPDATE ----------------
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingId) return;

    try {
      setLoading(true);

      await axios.put(
        `${API_URL}/${editingId}`,
        {
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setSuccess("Blog updated successfully ✅");

      setEditingId(null);
      setForm({ title: "", content: "", status: "draft", tags: "" });

      fetchBlogs();
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- EDIT ----------------
  const handleEdit = (blog) => {
    setEditingId(blog._id);

    setForm({
      title: blog.title || "",
      content: blog.content || "",
      status: blog.status || "draft",
      tags: blog.tags?.join(", ") || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---------------- DELETE ----------------
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchBlogs();
    } catch (err) {
      console.log(err.message);
    }
  };

  // ---------------- STATUS COLOR ----------------
  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "text-green-600";
      case "draft":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Manage Blogs</h1>

        <input
          type="text"
          placeholder="Search blogs..."
          className="border p-2 rounded w-full mt-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FORM */}
      <div className="bg-white shadow p-4 rounded">
        <h2 className="font-semibold mb-3">
          {editingId ? "Edit Blog" : "Add Blog"}
        </h2>

        <form
          onSubmit={editingId ? handleUpdate : handleAdd}
          className="space-y-3"
        >
          {/* AUTHOR (READ ONLY) */}
          {editingId && (
            <p className="text-sm text-gray-600">
              <b>Author:</b>{" "}
              {blogs.find((b) => b._id === editingId)?.author?.name || "Admin"}
            </p>
          )}
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="border p-2 w-full rounded"
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Content"
            className="border p-2 w-full rounded"
          />
          {/* TAGS */}
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
            className="border p-2 w-full rounded"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          &nbsp; &nbsp;
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Loading..." : editingId ? "Update Blog" : "Add Blog"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-600 mt-2">{success}</p>}
      </div>

      {/* LIST */}
      <div className="bg-white shadow rounded p-4">
        {listLoading ? (
          <p>Loading...</p>
        ) : filtered.length === 0 ? (
          <p>No blogs found</p>
        ) : (
          filtered.map((b) => (
            <div key={b._id} className="border-b p-4 flex justify-between">
              <div>
                <p>
                  <b>Title:</b> {b.title}
                </p>

                <p>
                  <b>Author:</b> {b.author?.name || "Admin"}
                </p>

                <p>
                  <b>Tags:</b> {b.tags?.join(", ")}
                </p>

                <p>
                  <b>Status:</b>{" "}
                  <span className={`font-semibold ${getStatusColor(b.status)}`}>
                    {b.status}
                  </span>
                </p>
              </div>

              <div className="space-x-3">
                <button onClick={() => handleEdit(b)} className="text-blue-600">
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(b._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
