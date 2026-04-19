import React, { useState, useEffect } from "react";
import axios from "axios";

function ManagePortfolios() {
  const API_URL = "http://localhost:5000/api/portfolio";

  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    category: "",
    liveLink: "",
    githubLink: "",
  });

  const [portfolios, setPortfolios] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ GET ALL PORTFOLIOS
  const fetchPortfolios = async () => {
    try {
      setListLoading(true);
      const res = await axios.get(API_URL);
      setPortfolios(res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err.response?.data || err.message);
      setError("Failed to load portfolios");
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ SUBMIT (CREATE / UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSuccess("Portfolio updated successfully ✅");
      } else {
        await axios.post(API_URL, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSuccess("Portfolio created successfully ✅");
      }

      // reset
      setForm({
        title: "",
        description: "",
        imageUrl: "",
        category: "",
        liveLink: "",
        githubLink: "",
      });

      setEditingId(null);
      fetchPortfolios();
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ EDIT
  const handleEdit = (p) => {
    setForm({
      title: p.title || "",
      description: p.description || "",
      imageUrl: p.imageUrl || "",
      category: p.category || "",
      liveLink: p.liveLink || "",
      githubLink: p.githubLink || "",
    });

    setEditingId(p._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchPortfolios();
    } catch (err) {
      console.log("DELETE ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Manage Portfolios</h1>
        <p className="text-gray-500">Add, edit, and manage your portfolios</p>
      </div>

      {/* FORM */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Portfolio" : "Add Portfolio"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="col-span-2 border p-2 rounded"
            required
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="col-span-2 border p-2 rounded"
            required
          />

          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="border p-2 rounded"
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="border p-2 rounded"
            required
          />

          <input
            name="liveLink"
            value={form.liveLink}
            onChange={handleChange}
            placeholder="Live Link"
            className="border p-2 rounded"
          />

          <input
            name="githubLink"
            value={form.githubLink}
            onChange={handleChange}
            placeholder="GitHub Link"
            className="border p-2 rounded"
          />

          {error && <p className="col-span-2 text-red-500 text-sm">{error}</p>}

          {success && (
            <p className="col-span-2 text-green-600 text-sm">{success}</p>
          )}

          {/* BUTTONS */}
          <div className="col-span-2 flex justify-end gap-3">
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({
                    title: "",
                    description: "",
                    imageUrl: "",
                    category: "",
                    liveLink: "",
                    githubLink: "",
                  });
                }}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading
                ? editingId
                  ? "Updating..."
                  : "Adding..."
                : editingId
                  ? "Update"
                  : "Add"}
            </button>
          </div>
        </form>
      </div>

      {/* LIST */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">All Portfolios</h2>

        {listLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : portfolios.length === 0 ? (
          <p className="text-gray-500">No portfolios found</p>
        ) : (
          <div className="space-y-4">
            {portfolios.map((p) => (
              <div
                key={p._id}
                className="border rounded p-4 flex justify-between"
              >
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="text-sm text-gray-500">{p.description}</p>
                  <p className="text-sm">Category: {p.category}</p>

                  {p.imageUrl && (
                    <img
                      src={p.imageUrl}
                      alt="portfolio"
                      className="mt-2 w-32 h-20 object-cover rounded"
                    />
                  )}
                </div>

                <div className="space-x-3">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManagePortfolios;
